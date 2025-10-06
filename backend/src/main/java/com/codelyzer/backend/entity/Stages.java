package com.codelyzer.backend.entity;

/**
 * 1 = success
 * 0 = not set yet
 * -1 = failed
 */
public class Stages {
    private int upload;
    private int fork;
    private int clone;
    private int analysis;
    private int AI;
    private int pullRequests;
    private int cleaningResources;

    public void setUploadSuccess() {
        upload = 1;
    }

    public void setUploadFailed() {
        upload = -1;
    }

    public int getUpload() {
        return upload;
    }

    public void setForkSuccess() {
        fork = 1;
    }

    public void setForkFailed() {
        fork = -1;
    }

    public int getFork() {
        return fork;
    }

    public void setCloneSuccess() {
        clone = 1;
    }

    public void setCloneFailed() {
        clone = -1;
    }

    public int getClone() {
        return clone;
    }

    public void setAnalysisSuccess() {
        analysis = 1;
    }

    public void setAnalysisFailed() {
        analysis = -1;
    }

    public void setAiSuccess() {
        AI = 1;
    }

    public void setAiFailed() {
        AI = -1;
    }

    public int getAI() {
        return AI;
    }

    public int getAnalysis() {
        return analysis;
    }

    public void setPullRequestsSuccess() {
        pullRequests = 1;
    }

    public void setPullRequestsFailed() {
        pullRequests = -1;
    }

    public int getPullRequests() {
        return pullRequests;
    }

    private void setCleaningResourcesSuccess() {
        cleaningResources = 1;
    }

    private void setCleaningResourcesFailed() {
        cleaningResources = -1;
    }

    public int getCleaningResources() {
        return cleaningResources;
    }
}
