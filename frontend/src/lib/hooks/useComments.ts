import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../queryKeys';
import { MOCK_USER_ID } from '../../constants/mockUser';
import type { Comment, CreateCommentInput } from '../types';

// POST /api/comments/{postId}/comment — add a comment to a post.
export function useCommentPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postId,
      content,
      attachments = [],
    }: CreateCommentInput): Promise<Comment> => {
      const { data } = await api.post<Comment>(
        `/api/comments/${postId}/comment`,
        { postId, userId: MOCK_USER_ID, content, attachments },
      );
      return data;
    },
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(postId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
  });
}
