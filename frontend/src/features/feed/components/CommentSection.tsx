import React, { useState } from 'react';
import { Avatar, Button } from '../../../components/ui';
import { useCommentPost } from '../../../lib/hooks';
import { MOCK_USER } from '../../../constants/mockUser';
import defaultAvatar from '../../../assets/default-user.jpg';

interface CommentSectionProps {
  postId: string;
}

// Session-local comment thread. The backend has no GET comments endpoint, so we
// cannot reload a post's comments — we only keep the ones posted in this
// session (optimistically appended once the mutation resolves).
interface LocalComment {
  id: string;
  authorName: string;
  content: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [content, setContent] = useState('');
  const commentPost = useCommentPost();

  const trimmed = content.trim();
  const canSubmit = trimmed.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || commentPost.isPending) return;

    commentPost.mutate(
      { postId, content: trimmed },
      {
        onSuccess: (created) => {
          setComments((prev) => [
            ...prev,
            {
              id: created?.id ?? `local-${Date.now()}`,
              authorName: MOCK_USER.displayName,
              content: trimmed,
            },
          ]);
          setContent('');
        },
      },
    );
  };

  return (
    <div className="mt-4 border-t border-border pt-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Avatar
          src={defaultAvatar}
          fallback={MOCK_USER.displayName}
          alt={MOCK_USER.displayName}
          size="sm"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post your reply"
          className="flex-1 rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-secondary outline-none focus-visible:border-accent"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!canSubmit}
          isLoading={commentPost.isPending}
        >
          Reply
        </Button>
      </form>

      {comments.length > 0 && (
        <ul className="mt-3 space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-2">
              <Avatar
                src={defaultAvatar}
                fallback={comment.authorName}
                alt={comment.authorName}
                size="sm"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary">
                  {comment.authorName}
                </p>
                <p className="whitespace-pre-wrap break-words text-sm text-text-secondary">
                  {comment.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentSection;
