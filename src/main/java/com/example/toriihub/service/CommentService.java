package com.example.toriihub.service;

import com.example.toriihub.model.Comment;
import com.example.toriihub.model.Post;
import com.example.toriihub.model.User;
import com.example.toriihub.repository.CommentRepository;
import com.example.toriihub.repository.PostRepository;
import com.example.toriihub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getComment(UUID id) {
        return commentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Comment not found: " + id));
    }

    public Comment createComment(Comment c) {
        userRepository.findById(c.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found: " + c.getUserId()));
        return commentRepository.save(c);
    }

    public void deleteComment(UUID id) {
        commentRepository.deleteById(id);
    }
}
