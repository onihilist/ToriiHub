import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  TweetCard,
} from '../../../components/ui';
import {
  useDeletePost,
  useLikePost,
  useRepostPost,
} from '../../../lib/hooks';
import { MOCK_USER_ID } from '../../../constants/mockUser';
import type { Post } from '../../../lib/types';
import { CommentSection } from './CommentSection';

interface PostItemProps {
  post: Post;
}

// Wraps the shared presentational TweetCard and owns the interaction state.
// Liked/reposted are not returned by the backend and there is no unlike/unrepost
// endpoint, so we keep a local boolean per post: once toggled it stays active
// and a re-click is a no-op (prevents double-counting on the server).
export function PostItem({ post }: PostItemProps) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const likePost = useLikePost();
  const repostPost = useRepostPost();
  const deletePost = useDeletePost();

  const isOwnPost = post.userId === MOCK_USER_ID;

  const handleLike = () => {
    if (liked || likePost.isPending) return;
    setLiked(true);
    likePost.mutate(post.id, {
      onError: () => setLiked(false),
    });
  };

  const handleRepost = () => {
    if (reposted || repostPost.isPending) return;
    setReposted(true);
    repostPost.mutate(post.id, {
      onError: () => setReposted(false),
    });
  };

  const handleDelete = () => {
    deletePost.mutate(post.id);
  };

  // Reflect the optimistic like/repost in the displayed counts.
  const displayPost: Post = {
    ...post,
    likes: post.likes + (liked ? 1 : 0),
    reposts: post.reposts + (reposted ? 1 : 0),
  };

  return (
    <TweetCard
      post={displayPost}
      onLike={handleLike}
      onRepost={handleRepost}
      onComment={() => setShowComments((v) => !v)}
      isLiked={liked}
      isReposted={reposted}
    >
      {isOwnPost && (
        <div className="mt-2 flex justify-end">
          <Dropdown
            trigger={
              <span className="px-2 text-text-secondary hover:text-text-primary">
                •••
              </span>
            }
          >
            <DropdownItem
              destructive
              onClick={handleDelete}
              disabled={deletePost.isPending}
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      )}

      {showComments && <CommentSection postId={post.id} />}
    </TweetCard>
  );
}

export default PostItem;
