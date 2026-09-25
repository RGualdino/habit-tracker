import { api } from './axios';

export interface Habit {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  userId: number;
  completedToday: boolean;
}

export interface CreateHabitData {
  title: string;
  description?: string;
}

export const getHabits = async (): Promise<Habit[]> => {
  const response = await api.get<Habit[]>('/habits');

  return response.data;
};

export const createHabit = async (data: CreateHabitData) => {
  const response = await api.post<Habit>('/habits', data);

  return response.data;
};

export const completeHabit = async (habitId: number) => {
  const response = await api.post(`/habits/${habitId}/complete`);

  return response.data;
};

export const uncompleteHabit = async (habitId: number) => {
  const response = await api.delete(`/habits/${habitId}/complete`);

  return response.data;
};