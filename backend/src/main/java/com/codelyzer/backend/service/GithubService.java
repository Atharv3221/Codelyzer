package com.codelyzer.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class GithubService {
    private static final Logger log = LoggerFactory.getLogger(GithubService.class);
    private static final String GITHUB_API_BASE = "https://api.github.com";
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Value("${github.bot.token}")
    private String botToken;

    public String createFork(String repoUrl) {
        try {
            HttpURLConnection conn = getHttpURLConnection(repoUrl);
            int code = conn.getResponseCode();

            InputStream is = (code >= 200 && code < 300) ? conn.getInputStream() : conn.getErrorStream();
            String response = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))
                    .lines()
                    .reduce("", (a, b) -> a + b + "\n");

            if (code == 201 || code == 202) {
                String forkUrl = extractForkUrl(response);
                log.info("Fork created successfully: {}", forkUrl != null ? forkUrl : "URL not found");
                return forkUrl != null ? forkUrl : "Fork created (URL not found)";
            } else {
                log.error("Fork creation failed with HTTP code {}: {}", code, response);
                return null;
            }

        } catch (IOException e) {
            log.error("IOException while creating fork for {}: {}", repoUrl, e.getMessage(), e);
            return null;
        } catch (Exception e) {
            log.error("Unexpected error while creating fork for {}: {}", repoUrl, e.getMessage(), e);
            return null;
        }
    }

    private HttpURLConnection getHttpURLConnection(String repoUrl) throws IOException {
        String[] parts = repoUrl.replace("https://github.com/", "").split("/");
        if (parts.length < 2) {
            throw new IllegalArgumentException("Invalid GitHub repo URL: " + repoUrl);
        }

        String owner = parts[0];
        String repo = parts[1].replace(".git", "");
        String apiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/forks";

        HttpURLConnection conn = (HttpURLConnection) new URL(apiUrl).openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Accept", "application/vnd.github+json");
        conn.setRequestProperty("Authorization", "token " + botToken);
        conn.setDoOutput(true);
        return conn;
    }

    private String extractForkUrl(String response) {
        try {
            JSONObject json = new JSONObject(response);
            return json.getString("html_url");
        } catch (Exception e) {
            log.error("Failed to parse fork URL from response", e);
            return null;
        }
    }

    /**
     * Creates a pull request from a forked repository to the original repository.
     */
    public String createCrossForkPR(String forkOwner, String forkRepo,
                                    String originalOwner, String originalRepo,
                                    String headBranch, String baseBranch,
                                    String prTitle, String prBody) {
        HttpURLConnection conn = null;
        try {
            String headRef = forkOwner + ":" + headBranch;
            String apiUrl = String.format("%s/repos/%s/%s/pulls", GITHUB_API_BASE, originalOwner, originalRepo);

            log.info("Creating PR: {}/{}:{} → {}/{}:{}",
                    forkOwner, forkRepo, headBranch, originalOwner, originalRepo, baseBranch);

            // Build request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("title", prTitle);
            requestBody.put("head", headRef);
            requestBody.put("base", baseBranch);
            requestBody.put("body", prBody);
            requestBody.put("maintainer_can_modify", true);

            String jsonBody = objectMapper.writeValueAsString(requestBody);
            log.debug("PR request body: {}", jsonBody);

            // Create connection
            URL url = new URL(apiUrl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "token " + botToken);
            conn.setRequestProperty("Accept", "application/vnd.github.v3+json");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);

            // Send request
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // Read response
            int responseCode = conn.getResponseCode();
            log.debug("PR API response code: {}", responseCode);

            if (responseCode == 200 || responseCode == 201) {
                String responseBody = readInputStream(conn.getInputStream());
                log.debug("PR API response: {}", responseBody);

                Map<String, Object> response = objectMapper.readValue(responseBody, Map.class);
                String htmlUrl = (String) response.get("html_url");
                Integer prNumber = (Integer) response.get("number");
                log.info("PR #{} created successfully: {}", prNumber, htmlUrl);
                return htmlUrl;
            } else if (responseCode == 422) {
                String errorBody = readInputStream(conn.getErrorStream());
                log.warn("PR validation error (422): {}", errorBody);
                if (errorBody.toLowerCase().contains("pull request already exists")) {
                    log.warn("PR already exists for branch: {}", headBranch);
                }
                return null;
            } else {
                String errorBody = readInputStream(conn.getErrorStream());
                log.error("Failed to create PR. Response code: {}, Error: {}", responseCode, errorBody);
                return null;
            }

        } catch (IOException e) {
            log.error("IOException while creating PR: {}", e.getMessage(), e);
            return null;
        } catch (Exception e) {
            log.error("Unexpected error while creating PR: {}", e.getMessage(), e);
            return null;
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
    }

    private String readInputStream(InputStream inputStream) throws IOException {
        if (inputStream == null) {
            return "";
        }
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            return reader.lines().reduce("", (a, b) -> a + b + "\n");
        }
    }
}