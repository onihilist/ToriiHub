package com.example.toriihub.repository;

import com.example.toriihub.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByUserId(UUID userId);
    List<Comment> findByPostId(UUID postId);
}