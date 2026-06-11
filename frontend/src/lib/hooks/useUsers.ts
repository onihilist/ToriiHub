import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../queryKeys';
import { MOCK_USER_ID } from '../../constants/mockUser';
import type { User } from '../types';

// GET /api/users/{id} — a single user profile.
export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: async (): Promise<User> => {
      const { data } = await api.get<User>(`/api/users/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

// POST /api/events/{userFollowedId}/follow?userFollowingId={MOCK_USER_ID}
// Follow a user. Not a toggle (no unfollow endpoint). Arg = userFollowedId.
export function useFollowUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userFollowedId: string): Promise<void> => {
      await api.post(`/api/events/${userFollowedId}/follow`, null, {
        params: { userFollowingId: MOCK_USER_ID },
      });
    },
    onSuccess: (_data, userFollowedId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(userFollowedId),
      });
    },
  });
}
