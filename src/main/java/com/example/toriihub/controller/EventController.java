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

    // TODO: Don't forget to also don't to like more than 1 time
    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(
        @PathVariable UUID postId,
        @RequestParam UUID userId
    ) {
        eventService.likePost(postId, userId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // TODO: Don't forget to also don't to repost more than 1 time
    @PostMapping("/{postId}/repost")
    public ResponseEntity<Void> repostPost(
        @PathVariable UUID postId,
        @RequestParam UUID userId
    ) {
        eventService.repostPost(postId, userId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
