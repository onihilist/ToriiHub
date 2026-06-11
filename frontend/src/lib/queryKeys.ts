// Centralized React Query keys so queries and invalidations stay consistent.
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    detail: (id: string) => ['posts', id] as const,
  },
  users: {
    detail: (id: string) => ['users', id] as const,
  },
};
