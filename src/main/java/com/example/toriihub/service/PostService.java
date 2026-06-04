package com.example.toriihub.service;

import com.example.toriihub.model.Post;
import com.example.toriihub.model.User;
import com.example.toriihub.repository.PostRepository;
import com.example.toriihub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPost(UUID id) {
        return postRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post not found: " + id));
    }

    public Post createPost(UUID userId, Post post) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        post.setUserId(user.getId());
        post.setAuthorName(user.getUsername());
        return postRepository.save(post);
    }

    public void deletePost(UUID id) {
        postRepository.deleteById(id);
    }
}