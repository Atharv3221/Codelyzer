package com.codelyzer.backend.controller;

import com.codelyzer.backend.entity.RepoUrlDto;
import com.codelyzer.backend.entity.Stages;
import com.codelyzer.backend.service.CompleteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class ApiController {

    private static final Logger log = LoggerFactory.getLogger(ApiController.class);
    private final CompleteService completeService;

    public ApiController(CompleteService completeService) {
        this.completeService = completeService;
    }

    @GetMapping(value = "/stages-status", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Stages> getStatus() {
        return completeService.streamUpload();
    }

    @PostMapping("/upload")
    public void uploadRepoURL(@RequestBody RepoUrlDto repoUrlDto)  {
        Stages stages = new Stages();
        System.out.println(repoUrlDto.getRepoUrl());
        completeService.startOperations(stages, repoUrlDto.getRepoUrl());
    }
}
