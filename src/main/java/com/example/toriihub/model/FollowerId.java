package com.example.toriihub.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class FollowerId implements Serializable {

    @Column(name = "follower_id")
    private UUID followerId;

    @Column(name = "following_id")
    private UUID followingId;

    public FollowerId() {}
    public FollowerId(UUID followerId, UUID followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FollowerId)) return false;
        FollowerId that = (FollowerId) o;
        return Objects.equals(followerId, that.followerId) &&
            Objects.equals(followingId, that.followingId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(followerId, followingId);
    }

}
