package com.example.toriihub.controller;

import java.util.UUID;

import com.example.toriihub.model.Comment;
import com.example.toriihub.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{postId}/comment")
    public ResponseEntity<Void> commentPost(
        @RequestBody Comment comment
    ) {
        commentService.createComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
