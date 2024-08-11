// types/auth.types.ts
export interface User {
  username: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string | null;
}

export interface AuthError {
  message: string;
}
