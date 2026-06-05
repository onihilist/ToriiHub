package com.example.toriihub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    @JsonIgnore
    private UUID id;

    @Column(name = "post_id", nullable = false)
    private UUID postId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(columnDefinition = "text[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private List<String> attachments;

    @Column(nullable = false)
    private int likes;

    @Column(nullable = false)
    private int reposts;

    @Column(nullable = false)
    private String content;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
