package com.example.toriihub.repository;

import com.example.toriihub.model.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, UUID> {
    boolean existsByFollowerIdAndFollowingId(UUID followerId, UUID followingId);
    void deleteByFollowerIdAndFollowingId(UUID followerId, UUID followingId);
    Follower findByFollowerIdAndFollowingId(UUID followerId, UUID followingId);
}
