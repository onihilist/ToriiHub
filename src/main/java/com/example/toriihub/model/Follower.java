package com.example.toriihub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

import java.time.LocalDateTime;

@Entity
@Table(name = "followers")
@Data
public class Follower {

    @EmbeddedId
    private FollowerId id;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "follower_id")
    private UUID followerId;

    @ManyToOne
    @MapsId("followingId")
    @JoinColumn(name = "following_id", nullable = false)
    private UUID followingId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}