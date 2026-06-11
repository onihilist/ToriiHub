import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
import defaultAvatar from '../../assets/default-user.jpg';
import type { Post } from '../../lib/types';

export interface TweetCardProps {
  post: Post;
  onLike?: (id: string) => void;
  onRepost?: (id: string) => void;
  onComment?: (id: string) => void;
  /**
   * Liked/reposted state is not returned by the backend, so the feature owns
   * it (e.g. optimistically) and passes it down for the active styling.
   */
  isLiked?: boolean;
  isReposted?: boolean;
  /** Extra content rendered below the footer (e.g. a comment list). */
  children?: React.ReactNode;
  className?: string;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Presentational post card. It stays agnostic of the data layer — callers wire
// the mutation hooks via the on* callbacks.
export function TweetCard({
  post,
  onLike,
  onRepost,
  onComment,
  isLiked,
  isReposted,
  children,
  className,
}: TweetCardProps) {
  return (
    <article
      className={clsx(
        'rounded-card border border-border bg-surface p-4',
        className,
      )}
    >
      <header className="flex items-center gap-3">
        <Avatar
          src={defaultAvatar}
          fallback={post.authorName}
          alt={post.authorName}
          size="md"
        />
        <div className="min-w-0">
          <p className="truncate font-medium text-text-primary">
            {post.authorName}
          </p>
          <p className="text-xs text-text-secondary">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </header>

      <p className="mt-3 whitespace-pre-wrap break-words text-text-primary">
        {post.content}
      </p>

      {post.attachments.length > 0 && (
        <div className="mt-3 grid gap-2">
          {post.attachments.map((att, i) => (
            <img
              key={i}
              src={att}
              alt=""
              className="w-full rounded-card border border-border object-cover"
            />
          ))}
        </div>
      )}

      <footer className="mt-4 flex items-center gap-6 text-sm text-text-secondary">
        <button
          type="button"
          onClick={() => onComment?.(post.id)}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
        >
          <span aria-hidden>💬</span>
        </button>
        <motion.button
          type="button"
          onClick={() => onRepost?.(post.id)}
          whileTap={{ scale: 0.85 }}
          // Pop when the active state turns on (key change remounts → animate).
          key={`repost-${isReposted ? 'on' : 'off'}`}
          initial={false}
          animate={isReposted ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className={clsx(
            'inline-flex items-center gap-1.5 transition-colors hover:text-accent',
            isReposted && 'text-accent',
          )}
        >
          <span aria-hidden>🔁</span>
          {post.reposts}
        </motion.button>
        <motion.button
          type="button"
          onClick={() => onLike?.(post.id)}
          whileTap={{ scale: 0.85 }}
          key={`like-${isLiked ? 'on' : 'off'}`}
          initial={false}
          animate={isLiked ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className={clsx(
            'inline-flex items-center gap-1.5 transition-colors hover:text-accent',
            isLiked && 'text-accent',
          )}
        >
          <span aria-hidden>❤️</span>
          {post.likes}
        </motion.button>
      </footer>

      {children}
    </article>
  );
}

export default TweetCard;
