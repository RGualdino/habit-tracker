import { api } from './axios';

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

export const register = async (data: RegisterData) => {
  const response = await api.post('/auth/register', data);

  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);

  return response.data;
};