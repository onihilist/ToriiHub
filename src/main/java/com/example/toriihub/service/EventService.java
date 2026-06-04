package com.example.toriihub.service;

import com.example.toriihub.model.Post;
import com.example.toriihub.model.User;
import com.example.toriihub.repository.PostRepository;
import com.example.toriihub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public void like(UUID postId, UUID userId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found: " + postId));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
    }

}
