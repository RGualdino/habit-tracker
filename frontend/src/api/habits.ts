import { api } from './axios';

export interface Habit {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  userId: number;
  completedToday: boolean;
}

export const getHabits = async (): Promise<Habit[]> => {
  const response = await api.get<Habit[]>('/habits');

  return response.data;
};