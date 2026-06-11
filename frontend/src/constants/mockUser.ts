// Simulated logged-in user until a real auth flow exists.
// Fixed UUID so it stays stable across reloads.
export const MOCK_USER_ID = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';

export const MOCK_USER = {
  id: MOCK_USER_ID,
  username: 'me',
  displayName: 'Me',
} as const;
