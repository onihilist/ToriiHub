import React from 'react';
import { motion } from 'framer-motion';
import type { Post } from '../../../lib/types';
import { PostItem } from './PostItem';

interface PostListProps {
  posts: Post[];
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

// Animated timeline: each card fades/slides in with a small stagger.
export function PostList({ posts }: PostListProps) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {posts.map((post) => (
        <motion.li key={post.id} variants={item}>
          <PostItem post={post} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default PostList;
