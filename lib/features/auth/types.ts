interface User {
  id: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}