import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../queryKeys';
import { MOCK_USER_ID } from '../../constants/mockUser';
import type { CreatePostInput, Post } from '../types';

// GET /api/posts — full timeline.
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: async (): Promise<Post[]> => {
      const { data } = await api.get<Post[]>('/api/posts');
      return data;
    },
  });
}

// GET /api/posts/{id} — single post.
export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: async (): Promise<Post> => {
      const { data } = await api.get<Post>(`/api/posts/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

// POST /api/posts?userId={MOCK_USER_ID} — create a post.
export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePostInput): Promise<Post> => {
      const { data } = await api.post<Post>('/api/posts', input, {
        params: { userId: MOCK_USER_ID },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
  });
}

// DELETE /api/posts/{id} — delete a post.
export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
  });
}

// POST /api/events/{postId}/like?userId={MOCK_USER_ID} — like a post.
export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string): Promise<void> => {
      await api.post(`/api/events/${postId}/like`, null, {
        params: { userId: MOCK_USER_ID },
      });
    },
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(postId),
      });
    },
  });
}

// POST /api/events/{postId}/repost?userId={MOCK_USER_ID} — repost a post.
export function useRepostPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string): Promise<void> => {
      await api.post(`/api/events/${postId}/repost`, null, {
        params: { userId: MOCK_USER_ID },
      });
    },
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(postId),
      });
    },
  });
}
