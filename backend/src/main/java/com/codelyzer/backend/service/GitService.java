package com.codelyzer.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.*;
import java.util.*;

@Service
public class GitService {

    private static final Logger logger = LoggerFactory.getLogger(GitService.class);

    public static String commitOnNewBranch(String repoDir, String srcFile, String tempFile,
                                           String commitMsg, String githubToken,
                                           String forkOwner, String forkRepo,
                                           String baseBranch) {
        try {
            if (!Files.exists(Path.of(repoDir)) || !Files.exists(Path.of(srcFile)) || !Files.exists(Path.of(tempFile))) {
                logger.error("Invalid file or repo path - repoDir: {}, srcFile: {}, tempFile: {}",
                        repoDir, srcFile, tempFile);
                return null;
            }

            // Configure remote
            String remoteUrl = "https://" + githubToken + "@github.com/" + forkOwner + "/" + forkRepo + ".git";
            runGit(repoDir, "remote", "set-url", "origin", remoteUrl);
            logger.info("Configured remote origin for {}/{}", forkOwner, forkRepo);

            // Checkout base branch (without pull)
            runGit(repoDir, "checkout", baseBranch);
            logger.info("Checked out base branch: {}", baseBranch);

            // Copy file AFTER checking out base branch
            Files.copy(Path.of(tempFile), Path.of(srcFile), StandardCopyOption.REPLACE_EXISTING);
            logger.debug("Copied {} to {}", tempFile, srcFile);

            // Check for changes before branching
            if (!hasChanges(repoDir)) {
                logger.warn("No file changes detected, skipping branch creation");
                return null;
            }

            // Create unique branch name (UUID-based)
            String branchName = "codelyzer-patch-" + UUID.randomUUID().toString().substring(0, 8);
            runGit(repoDir, "checkout", "-b", branchName);
            logger.info("Created new branch: {}", branchName);

            // Stage only one file
            Path relativePath = Path.of(repoDir).relativize(Path.of(srcFile));
            runGit(repoDir, "add", relativePath.toString());
            logger.debug("Staged file: {}", relativePath);

            // Double check for changes
            if (!hasChanges(repoDir)) {
                logger.warn("No changes to commit after staging, returning to base branch");
                // Cleanup: go back to base branch
                runGit(repoDir, "checkout", baseBranch);
                return null;
            }

            // Commit and push
            runGit(repoDir, "commit", "-m", commitMsg);
            logger.info("Committed changes with message: {}", commitMsg);

            runGit(repoDir, "push", "-u", "origin", branchName);
            logger.info("Successfully pushed branch: {}", branchName);

            // IMPORTANT: Return to base branch for next iteration
            runGit(repoDir, "checkout", baseBranch);
            logger.debug("Returned to base branch: {}", baseBranch);

            return branchName;
        } catch (Exception e) {
            logger.error("Error during git operations in repo {}: {}", repoDir, e.getMessage(), e);
            // Try to return to base branch even on error
            try {
                runGit(repoDir, "checkout", baseBranch);
                logger.debug("Recovered to base branch after error");
            } catch (Exception recoveryError) {
                logger.error("Failed to recover to base branch: {}", recoveryError.getMessage());
            }
            return null;
        }
    }

    private static boolean hasChanges(String repoDir) throws IOException, InterruptedException {
        Process proc = new ProcessBuilder("git", "-C", repoDir, "status", "--porcelain")
                .redirectErrorStream(true).start();
        String status = new String(proc.getInputStream().readAllBytes()).trim();
        int exitCode = proc.waitFor();

        if (exitCode != 0) {
            logger.warn("Git status command returned non-zero exit code: {}", exitCode);
        }

        return !status.isEmpty();
    }

    private static void runGit(String repoDir, String... args) throws IOException, InterruptedException {
        List<String> cmd = new ArrayList<>();
        cmd.add("git");
        cmd.add("-C");
        cmd.add(repoDir);
        cmd.addAll(Arrays.asList(args));

        logger.debug("Executing git command: {}", String.join(" ", cmd));

        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.redirectErrorStream(true);
        Process process = pb.start();

        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
                logger.trace("Git output: {}", line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            logger.error("Git command failed with exit code {}: {}\nOutput: {}",
                    exitCode, String.join(" ", args), output.toString());
            throw new RuntimeException("Git command failed: " + String.join(" ", args));
        }
    }
}