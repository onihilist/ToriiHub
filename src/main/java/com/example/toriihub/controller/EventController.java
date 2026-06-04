package com.example.toriihub.controller;

import com.example.toriihub.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping("/{postId}/likes")
    public ResponseEntity<Void> likePost(
        @PathVariable UUID postId,
        @RequestParam UUID userId
    ) {
        eventService.like(postId, userId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
