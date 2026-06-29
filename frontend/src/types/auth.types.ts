export interface AuthTypes {
  id: string;
  email: string;
  name?: string;
  role: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: AuthTypes;
  token: string;
}
