import { useState } from 'react';
import { motion } from 'framer-motion';
import { TweetCard } from '../../../components/ui';
import { useLikePost, useRepostPost } from '../../../lib/hooks';
import type { Post } from '../../../lib/types';

export interface ProfileTweetListProps {
  posts: Post[];
}

export function ProfileTweetList({ posts }: ProfileTweetListProps) {
  const like = useLikePost();
  const repost = useRepostPost();
  // Liked/reposted state isn't returned by the backend; track it locally so the
  // TweetCard can render the active styling after an action.
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [reposted, setReposted] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    like.mutate(id);
    setLiked((prev) => new Set(prev).add(id));
  };

  const handleRepost = (id: string) => {
    repost.mutate(id);
    setReposted((prev) => new Set(prev).add(id));
  };

  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-text-secondary">
        Aucun tweet pour le moment.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-4 px-4 pb-8">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <TweetCard
            post={post}
            onLike={handleLike}
            onRepost={handleRepost}
            isLiked={liked.has(post.id)}
            isReposted={reposted.has(post.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default ProfileTweetList;
