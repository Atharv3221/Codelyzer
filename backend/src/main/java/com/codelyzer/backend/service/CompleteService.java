package com.codelyzer.backend.service;

import com.codelyzer.backend.entity.Stages;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class CompleteService {

    private final ScriptService scriptService;

    private final GithubService githubService;

    private final Sinks.Many<Stages> sink = Sinks.many().multicast().onBackpressureBuffer();

    public CompleteService(ScriptService scriptService, GithubService githubService) {
        this.scriptService = scriptService;
        this.githubService = githubService;
    }

    public Flux<Stages> streamUpload() {
        return sink.asFlux();
    }

    public void startOperations(Stages stages, String mainRepoURL) {
        scriptService.setMainRepoURL(mainRepoURL);
        scriptService.setRepoNameFromUrl();
        scriptService.setRepoOwner();
        // initial
        sink.tryEmitNext(stages);
        // verify if repo exists
        boolean response = scriptService.isRepoExists();
        if (response) {
            stages.setUploadSuccess();
        } else {
            stages.setUploadFailed();
            sink.tryEmitNext(stages);
            return;
        }
        sink.tryEmitNext(stages);
        // create a fork
        String forkRepoUrl = githubService.createFork(mainRepoURL);
        if (!forkRepoUrl.isEmpty()) {
            stages.setForkSuccess();
            scriptService.setForkRepoURL(forkRepoUrl);
        } else {
            stages.setForkFailed();
            sink.tryEmitNext(stages);
            return;
        }
        sink.tryEmitNext(stages);
        // cloning
        response = scriptService.makeClone();
        if (response) {
            stages.setCloneSuccess();
        } else {
            stages.setCloneFailed();
            sink.tryEmitNext(stages);
            return;
        }
        sink.tryEmitNext(stages);
        // analysis
        response = scriptService.doAnalysis();
        if (response) {
            stages.setAnalysisSuccess();
        } else {
            stages.setAnalysisFailed();
            sink.tryEmitNext(stages);
            return;
        }
        sink.tryEmitNext(stages);

        scriptService.convertXmlFileToJsonFile();
        // generates commits file
        scriptService.fetchCommits();

        response = scriptService.testAi();
        if (response) {
            stages.setAiSuccess();
        } else {
            stages.setAiFailed();
            sink.tryEmitNext(stages);
            return;
        }
        sink.tryEmitNext(stages);
        // prs

        response = scriptService.letAiWork();
        if (response) {
            stages.setPullRequestsSuccess();
        } else {
            stages.setPullRequestsFailed();
            sink.tryEmitNext(stages);
            return;
        }
        sink.tryEmitNext(stages);
        // cleaning resources

        scriptService.cleanResources();
    }
}
