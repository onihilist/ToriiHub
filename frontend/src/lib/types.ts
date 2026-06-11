// Domain types mirroring the Spring Boot backend (http://localhost:8080).
// Exact schemas provided by the team lead — do not add speculative fields.

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  authorName: string;
  content: string;
  attachments: string[];
  likes: number;
  reposts: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  attachments: string[];
  likes: number;
  reposts: number;
  createdAt: string;
}

export interface CreatePostInput {
  content: string;
  attachments?: string[];
}

export interface CreateCommentInput {
  postId: string;
  content: string;
  attachments?: string[];
}
