package com.example.toriihub.repository;

import com.example.toriihub.model.Post;
import com.example.toriihub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByAuthorId(UUID userId);
}