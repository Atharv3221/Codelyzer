package com.codelyzer.backend.logic;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedWriter;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

/**
 * Safely edits a file based on Checkstyle error blocks provided by FileManager.
 * Integrates Cerebras API to resolve error blocks.
 */
public class FileEditor {

    @Value("${cerebras.api.key}")
    private static String CEREBRAS_API_KEY;
    private static final String CEREBRAS_ENDPOINT = "https://api.cerebras.ai/v1/chat/completions";
    private static final String MODEL = "qwen-3-235b-a22b-instruct-2507";

    public static void processFile(FileManager fm, String tempPath, boolean replaceOriginal) throws Exception {
        if (fm.shouldSkip()) {
            System.out.println("Skipping file: " + fm.getFilePath());
            return;
        }

        Path original = Path.of(fm.getFilePath());
        Path temp = Path.of(tempPath);

        // Clear temp file if exists
        Files.write(temp, new byte[0]);

        List<String> lines = Files.readAllLines(original);
        int[][] blocks = fm.getErrorLines();
        int blockCount = fm.getErrorCount();
        int blockIndex = 0;

        try (BufferedWriter writer = Files.newBufferedWriter(temp)) {
            for (int i = 0; i < lines.size(); ) {
                if (blockIndex < blockCount && blocks[blockIndex][0] <= i) {
                    int start = blocks[blockIndex][0];
                    int end = Math.min(blocks[blockIndex][1], lines.size() - 1);

                    List<String> blockLines = lines.subList(start, end + 1);
                    JSONObject errorJson = fm.getErrorJson(blockIndex);

                    // Resolve block with Cerebras
                    String resolvedBlock = resolveWithCerebras(blockLines, errorJson);

                    // Stream resolved block line by line
                    for (String line : resolvedBlock.split("\n")) {
                        writer.write(line);
                        writer.newLine();
                    }

                    i = end + 1;
                    blockIndex++;
                } else {
                    // Write unchanged line
                    writer.write(lines.get(i));
                    writer.newLine();
                    i++;
                }
            }
        }

        if (replaceOriginal) {
            Files.move(temp, original, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Processed and replaced file: " + fm.getFilePath());
        } else {
            System.out.println("Processed file (temp only): " + tempPath);
        }
    }

    private static String resolveWithCerebras(List<String> blockLines, JSONObject errorJson) {
        try {
            String message = errorJson.optString("message", "No description");
            String severity = errorJson.optString("severity", "warning");
            String source = errorJson.optString("source", "Unknown source");
            int line = errorJson.optInt("line", -1);
            int column = errorJson.optInt("column", -1);

            // Enhanced prompt
            String prompt = "You are a Java coding assistant.\n"
                    + "Fix the following code block according to the Checkstyle warning below.\n\n"
                    + "### Original Code Block:\n"
                    + String.join("\n", blockLines) + "\n\n"
                    + "### Checkstyle Warning:\n"
                    + "- Severity: " + severity + "\n"
                    + "- Source: " + source + "\n"
                    + "- Message: " + message + "\n"
                    + "- Line: " + line + ", Column: " + column + "\n\n"
                    + "### Requirements:\n"
                    + "- Only modify what is necessary to satisfy Checkstyle.\n"
                    + "- Preserve original functionality.\n"
                    + "- Maintain indentation and Javadoc formatting.\n"
                    + "- Return only the corrected code block, no explanations.";

            // Prepare request body
            JSONObject requestBody = new JSONObject();
            requestBody.put("model", MODEL);
            requestBody.put("max_tokens", 20000);
            requestBody.put("temperature", 0.7);
            requestBody.put("top_p", 0.8);
            requestBody.put("stream", false);

            JSONArray messages = new JSONArray();
            JSONObject systemMsg = new JSONObject();
            systemMsg.put("role", "system");
            systemMsg.put("content", prompt);
            messages.put(systemMsg);

            requestBody.put("messages", messages);

            // Build HTTP request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(CEREBRAS_ENDPOINT))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + CEREBRAS_API_KEY)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                    .build();

            // Send request
            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject jsonResponse = new JSONObject(response.body());
            // Extract corrected code from response
            String result = jsonResponse.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content");

            return result;
        } catch (Exception e) {
            System.out.println("[Cerebras] Failed, returning original block: " + e.getMessage());
            return String.join("\n", blockLines);
        }
    }
}
