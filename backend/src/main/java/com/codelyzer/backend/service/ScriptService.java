package com.codelyzer.backend.service;

import com.codelyzer.backend.logic.FileEditor;
import com.codelyzer.backend.logic.FileManager;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static com.codelyzer.backend.service.GitService.commitOnNewBranch;

@Service
public class ScriptService {
    private static final Logger log = LoggerFactory.getLogger(ScriptService.class);
    final String basePath = new File("").getAbsolutePath();
    private String mainRepoURL;
    private String forkRepoURL;
    private String repoName;
    private String repoOwner;
    private final String commit = "Codelyzer was here ツ";
    private final String title = "Static Analysis Problem Solved by Codelyzer";
    private final String body = "Automated code quality improvements by Codelyzer";


    private final String forkOwner = "Codelyzer-Bot";

    private final GithubService githubService;

    @Value("${cerebras.api.key}")
    private String apiKey;

    @Value("${github.bot.token}")
    private String gitHubToken;

    public ScriptService(GitService gitService, GithubService githubService) {
        this.githubService = githubService;
    }

    public void setForkRepoURL(String forkRepoURL) {
        this.forkRepoURL = forkRepoURL;
    }

    public void setMainRepoURL(String mainRepoURL) {
        this.mainRepoURL = mainRepoURL;
    }

    public void setRepoOwner() {
            String cleanedUrl = mainRepoURL.endsWith(".git")
                    ? mainRepoURL.substring(0, mainRepoURL.length() - 4)
                    : mainRepoURL;
            String[] parts = cleanedUrl.split("/");
            repoOwner = parts[parts.length - 2];
    }

    public void setRepoNameFromUrl() {
        String cleanedUrl = mainRepoURL.endsWith(".git") ? mainRepoURL
                .substring(0, mainRepoURL.length() - 4) : mainRepoURL;

        String[] parts = cleanedUrl.split("/");
        repoName = parts[parts.length - 1];
    }



    /**
     * Checks if the repository exists by sending a HEAD request.
     */
    public boolean isRepoExists() {
        if (mainRepoURL == null || mainRepoURL.isBlank()) {
            log.warn("Repository URL is not set");
            return false;
        }

        try {
            URL url = new URL(mainRepoURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("HEAD");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);

            int responseCode = connection.getResponseCode();
            connection.disconnect();
            boolean exists = responseCode == 200;
            log.info("Checked repo existence for {}: {}", mainRepoURL, exists);
            return exists;

        } catch (Exception e) {
            log.error("Error while checking repository existence: {}", mainRepoURL, e);
            return false;
        }
    }

    /**
     * Runs the clone_repo.sh script to clone the repository.
     */
    public boolean makeClone() {
        try {
            File scriptFile = new File(basePath, "backend/scripts/clone_repo.sh");
            String scriptPath = scriptFile.getAbsolutePath();

            log.info("Running clone script: {}", scriptPath);

            ProcessBuilder pb = new ProcessBuilder("sh", scriptPath,forkRepoURL);
            pb.redirectErrorStream(true); // merge stdout and stderr

            Process process = pb.start();

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    log.info("[Clone Script] {}", line);
                }
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                log.info("Repository cloned successfully: {}", forkRepoURL);
                return true;
            } else {
                log.error("Clone script exited with code {}", exitCode);
                return false;
            }

        } catch (IOException | InterruptedException e) {
            log.error("Error while running clone script for {}: {}", forkRepoURL, e.getMessage(), e);
            return false;
        }
    }

    public boolean doAnalysis() {
        try{
            File scriptFile = new File(basePath, "backend/scripts/run_analysis.sh");
            String scriptPath = scriptFile.getAbsolutePath();
            log.info("Running clone script: {}", scriptPath);

            ProcessBuilder pb = new ProcessBuilder("sh", scriptPath, repoName);
            pb.redirectErrorStream(true); // merge stdout and stderr

            Process process = pb.start();

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    log.info("[Analysis Script] {}", line);
                }
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                log.info("Analysis done successfully: {}", repoName);
                return true;
            } else {
                log.error("Analysis script exited with code {}", exitCode);
                return false;
            }

        } catch (IOException | InterruptedException e) {
            log.error("Error while running analysis script for {}: {}", repoName, e.getMessage(), e);
            return false;
        }
    }

        /**
         * Converts an XML file to a JSON file with exception handling.
         */
        public void convertXmlFileToJsonFile() {
            String xmlFilePath = new File(basePath, "backend/temp/analysis/" + repoName + ".xml")
                    .getAbsolutePath();
            String jsonFilePath = new File(basePath, "backend/temp/analysis/" + repoName + ".json")
                    .getPath();
            try {
                // Read XML file content
                Path xmlPath = Paths.get(xmlFilePath);
                String xmlContent = Files.readString(xmlPath);

                // Convert XML to JSON
                JSONObject jsonObj = XML.toJSONObject(xmlContent);
                String jsonString = jsonObj.toString(2); // pretty-print with 2 spaces

                // Write JSON to file
                Path jsonPath = Paths.get(jsonFilePath);
                Files.createDirectories(jsonPath.getParent()); // create parent dirs if not exist
                Files.writeString(jsonPath, jsonString);

                System.out.println("JSON file saved to: " + jsonFilePath);

            } catch (Exception e) {
                System.err.println("Unexpected error during XML to JSON conversion: " + e.getMessage());
                e.printStackTrace();
            }
        }

        // Example usage



    /**
     * Fetches the last 10 commits from a GitHub repository URL and saves them as a JSON file.
     *
     *
     * @throws IOException if network or file errors occur
     */
    public void fetchCommits() {
        try {

            // GitHub API URL
            String apiUrl = String.format("https://api.github.com/repos/%s/%s/commits?per_page=10", repoOwner, repoName);

            // HTTP request
            HttpURLConnection connection = (HttpURLConnection) new URL(apiUrl).openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/vnd.github+json");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);

            int code = connection.getResponseCode();
            InputStream is = (code >= 200 && code < 300) ? connection.getInputStream() : connection.getErrorStream();

            StringBuilder sb = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) sb.append(line);
            }

            if (code != 200) {
                System.err.println("Failed to fetch commits: HTTP " + code + " - " + sb);
                return;
            }

            // Parse commits
            JSONArray commitsArray = new JSONArray(sb.toString());
            JSONArray outputArray = new JSONArray();

            for (int i = 0; i < commitsArray.length(); i++) {
                JSONObject c = commitsArray.getJSONObject(i);
                JSONObject commitInfo = c.optJSONObject("commit");
                JSONObject authorInfo = commitInfo != null ? commitInfo.optJSONObject("author") : null;

                JSONObject outObj = new JSONObject();
                outObj.put("sha", c.optString("sha"));
                outObj.put("author", authorInfo != null ? authorInfo.optString("name") : null);
                outObj.put("date", authorInfo != null ? authorInfo.optString("date") : null);
                outObj.put("message", commitInfo != null ? commitInfo.optString("message") : null);

                outputArray.put(outObj);
            }

            // Save to backend/temp/commits/{repoName}.json
            File outputDir = new File("backend/temp/commits");
            if (!outputDir.exists()) outputDir.mkdirs();

            File outputFile = new File(outputDir, repoName + ".json");
            try (FileWriter writer = new FileWriter(outputFile)) {
                writer.write(outputArray.toString(2)); // 2-space indentation
            }

            System.out.println("Commits saved to " + outputFile.getAbsolutePath());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean letAiWork() {
        String analysisPath = new File(basePath, "backend/temp/analysis/" + repoName + ".json")
                .getAbsolutePath();
        String tempFilePath = new File(basePath, "backend/temp/files/" + repoName + ".java")
                .getAbsolutePath();
        String repoDir = new File(basePath, "backend/temp/repos/" + repoName).getAbsolutePath();
        try {
            List<FileManager> fileManagers = FileManager.analyze(analysisPath);
            int min = Math.min(5, fileManagers.size());
            for (int i = 0; i < min; i++) {
                FileManager fg = fileManagers.get(i);
                FileEditor.processFile(fg ,tempFilePath, false);

                String branch = commitOnNewBranch(repoDir, fg.getFilePath(),
                        tempFilePath, commit, gitHubToken, forkOwner, repoName, "main");
                githubService.createCrossForkPR(forkOwner, repoName, repoOwner,
                        repoName, branch, "main", title, body);
            }

        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean testAi() {
        try {
            URL url = new URL("https://api.cerebras.ai/v1/chat/completions");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + apiKey);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            // Minimal payload
            String payload = "{\"model\":\"qwen-3-235b-a22b-instruct-2507\",\"messages\":[{\"role\":\"system\",\"content\":\"ping\"}],\"max_tokens\":1}";
            conn.getOutputStream().write(payload.getBytes());
            return conn.getResponseCode() == 200; // true if API works
        } catch (Exception e) {
            return false;
        }
    }

    public boolean cleanResources() {
        try{
            File scriptFile = new File(basePath, "backend/scripts/remove_resources.sh");
            String scriptPath = scriptFile.getAbsolutePath();
            log.info("Running clone script: {}", scriptPath);

            ProcessBuilder pb = new ProcessBuilder("sh", scriptPath, repoName);
            pb.redirectErrorStream(true); // merge stdout and stderr

            Process process = pb.start();

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    log.info("[Analysis Script] {}", line);
                }
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                log.info("Cleanup done successfully: {}", repoName);
                return true;
            } else {
                log.error("Cleanup script exited with code {}", exitCode);
                return false;
            }

        } catch (IOException | InterruptedException e) {
            log.error("Error while running  script cleanup for {}: {}", repoName, e.getMessage(), e);
            return false;
        }
    }
}
