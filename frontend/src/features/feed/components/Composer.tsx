import React, { useState } from 'react';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button } from '../../../components/ui';
import { useCreatePost } from '../../../lib/hooks';
import { queryKeys } from '../../../lib/queryKeys';
import { MOCK_USER, MOCK_USER_ID } from '../../../constants/mockUser';
import type { Post } from '../../../lib/types';
import defaultAvatar from '../../../assets/default-user.jpg';

const MAX_LENGTH = 280;

// New post composer. Optimistic update approach (a): on submit we prepend a
// temporary post into the cache ourselves, then fire the mutation. The hook's
// onSuccess invalidates ['posts'] and resyncs with the server. On error we roll
// back to the snapshot taken before the optimistic write.
export function Composer() {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const createPost = useCreatePost();

  const trimmed = content.trim();
  const canSubmit = trimmed.length > 0 && trimmed.length <= MAX_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || createPost.isPending) return;

    const previous = queryClient.getQueryData<Post[]>(queryKeys.posts.all);

    const optimisticPost: Post = {
      id: `temp-${Date.now()}`,
      userId: MOCK_USER_ID,
      authorName: MOCK_USER.displayName,
      content: trimmed,
      attachments: [],
      likes: 0,
      reposts: 0,
      createdAt: new Date().toISOString(),
    };

    queryClient.setQueryData<Post[]>(queryKeys.posts.all, (old) => [
      optimisticPost,
      ...(old ?? []),
    ]);

    setContent('');

    createPost.mutate(
      { content: trimmed },
      {
        onError: () => {
          // Roll back to the pre-optimistic snapshot.
          queryClient.setQueryData(queryKeys.posts.all, previous);
        },
        // The hook already invalidates ['posts'] onSuccess, which resyncs and
        // replaces the temporary post with the server one.
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-border bg-surface p-4"
    >
      <div className="flex gap-3">
        <Avatar
          src={defaultAvatar}
          fallback={MOCK_USER.displayName}
          alt={MOCK_USER.displayName}
          size="md"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            rows={3}
            maxLength={MAX_LENGTH}
            className="w-full resize-none bg-transparent text-text-primary placeholder:text-text-secondary outline-none"
          />
          <div className="mt-2 flex items-center justify-between">
            <span
              className={clsx(
                'text-xs',
                trimmed.length > MAX_LENGTH
                  ? 'text-red-400'
                  : 'text-text-secondary',
              )}
            >
              {trimmed.length}/{MAX_LENGTH}
            </span>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!canSubmit}
              isLoading={createPost.isPending}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Composer;
