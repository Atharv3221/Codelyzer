package com.codelyzer.backend.logic;

import org.json.JSONArray;
import org.json.JSONObject;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles individual file details parsed from a Checkstyle report.
 * Stores file path, up to 5 spaced, non-overlapping error line blocks, skip flag for large files,
 * and full JSON object for each error block.
 */
public class FileManager {

    private final String filePath;
    private final int[][] errorLines = new int[5][2];   // up to 5 error blocks (start, end)
    private final JSONObject[] errorJson = new JSONObject[5]; // full JSON for each block
    private boolean skip = false;
    private int errorCount = 0;

    public FileManager(JSONObject fileObj) {
        this.filePath = fileObj.getString("name");

        // Skip large or unreadable files
        try {
            long totalLines = Files.lines(Paths.get(filePath)).count();
            if (totalLines > 300) {
                this.skip = true;
                return;
            }
        } catch (Exception e) {
            this.skip = true;
            return;
        }

        // Parse error array
        if (fileObj.has("error")) {
            JSONArray errors = fileObj.getJSONArray("error");
            for (int i = 0; i < errors.length() && errorCount < 5; i++) {
                JSONObject err = errors.getJSONObject(i);
                if (!err.has("line")) continue;
                int line = err.getInt("line");
                if (addError(line)) {
                    errorJson[errorCount - 1] = err; // store JSON for last added block
                }
            }
        }
    }

    /**
     * Adds an error block if it does not overlap or is too close to previous blocks.
     * @param line the line number of the Checkstyle error
     * @return true if block added, false otherwise
     */
    private boolean addError(int line) {
        if (errorCount >= 5) return false;

        int startLine = Math.max(0, line - 3);
        int endLine = line + 3;

        // Check against last added block
        if (errorCount > 0) {
            int[] lastBlock = errorLines[errorCount - 1];
            int lastStart = lastBlock[0];
            int lastEnd = lastBlock[1];

            boolean overlaps = startLine <= lastEnd && endLine >= lastStart;
            boolean tooClose = startLine - lastEnd < 5;

            if (overlaps || tooClose) return false;
        }

        errorLines[errorCount][0] = startLine;
        errorLines[errorCount][1] = endLine;
        errorCount++;
        return true;
    }

    public String getFilePath() {
        return filePath;
    }

    public int[][] getErrorLines() {
        return errorLines;
    }

    public JSONObject getErrorJson(int index) {
        if (index >= 0 && index < errorCount) return errorJson[index];
        return null;
    }

    public boolean shouldSkip() {
        return skip;
    }

    public int getErrorCount() {
        return errorCount;
    }

    /**
     * Static method to parse an analysis file and return list of FileManager objects.
     * @param analysisPath path to Checkstyle JSON report
     * @return list of FileManager
     * @throws Exception
     */
    public static List<FileManager> analyze(String analysisPath) throws Exception {
        String jsonText = Files.readString(Paths.get(analysisPath));
        JSONObject root = new JSONObject(jsonText);
        JSONArray files = root.getJSONObject("checkstyle").getJSONArray("file");

        List<FileManager> resultList = new ArrayList<>();
        int min = Math.min(15, files.length());
        for (int i = 0; i < min; i++) {
            FileManager fm = new FileManager(files.getJSONObject(i));
            resultList.add(fm);
        }
        return resultList;
    }
}
