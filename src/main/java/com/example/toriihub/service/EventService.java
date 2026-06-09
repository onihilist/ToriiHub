package com.example.toriihub.service;

import com.example.toriihub.model.*;
import com.example.toriihub.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final RepostRepository repostRepository;
    private final FollowerRepository followerRepository;

    @Transactional
    public void likePost(UUID postId, UUID userId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found: " + postId));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        boolean alreadyLiked = likeRepository.existsByPostIdAndUserId(postId, userId);

        if (alreadyLiked) {
            likeRepository.deleteByPostIdAndUserId(postId, userId);
            post.setLikes(post.getLikes() - 1);
        } else {
            Like like = new Like();
            like.setPostId(postId);
            like.setUserId(userId);
            likeRepository.save(like);
            post.setLikes(post.getLikes() + 1);
        }

        postRepository.save(post);
    }

    @Transactional
    public void repostPost(UUID postId, UUID userId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found: " + postId));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        boolean alreadyReposted = repostRepository.existsByPostIdAndUserId(postId, userId);

        if (alreadyReposted) {
            repostRepository.deleteByPostIdAndUserId(postId, userId);
            post.setReposts(post.getReposts() - 1);
        } else {
            Repost repost = new Repost();
            repost.setPostId(postId);
            repost.setUserId(userId);
            repostRepository.save(repost);
            post.setReposts(post.getReposts() + 1);
        }
        postRepository.save(post);
    }

    @Transactional
    public void followUser(UUID userFollowedId, UUID userFollowingId) {
        User userFollowed = userRepository.findById(userFollowedId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userFollowedId));
        User userFollowing = userRepository.findById(userFollowingId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userFollowingId));

        boolean alreadyFollowed = followerRepository.existsByFollower_IdAndFollowing_Id(
            userFollowing.getId(),
            userFollowed.getId()
        );

        if (alreadyFollowed) {
            followerRepository.deleteByFollower_IdAndFollowing_Id(
                userFollowing.getId(),
                userFollowed.getId()
            );
        } else {
            Follower follow = new Follower();
            follow.setId(new FollowerId(userFollowing.getId(), userFollowed.getId()));
            follow.setFollower(userFollowing);
            follow.setFollowing(userFollowed);
            followerRepository.save(follow);
        }
    }

}
