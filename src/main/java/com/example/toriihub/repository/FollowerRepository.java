package com.example.toriihub.repository;

import com.example.toriihub.model.Follower;
import com.example.toriihub.model.FollowerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, FollowerId> {

    // Use followerId and followingId (the UUID fields inside the User entity)
    boolean existsByFollower_IdAndFollowing_Id(UUID followerId, UUID followingId);

    Optional<Follower> findByFollower_IdAndFollowing_Id(UUID followerId, UUID followingId);

    void deleteByFollower_IdAndFollowing_Id(UUID followerId, UUID followingId);
}
