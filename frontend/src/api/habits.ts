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

export interface UpdateHabitData {
  title: string;
  description?: string;
}

export interface HabitStreak {
  currentStreak: number;
  longestStreak: number;
}

export interface HabitHistoryEntry {
  date: string;
}

export const getHabits = async (): Promise<Habit[]> => {
  const response = await api.get<Habit[]>('/habits');

  return response.data;
};

export const createHabit = async (data: CreateHabitData) => {
  const response = await api.post<Habit>('/habits', data);

  return response.data;
};

export const deleteHabit = async (habitId: number) => {
  await api.delete(`/habits/${habitId}`);
};

export const completeHabit = async (habitId: number) => {
  const response = await api.post(`/habits/${habitId}/complete`);

  return response.data;
};

export const uncompleteHabit = async (habitId: number) => {
  const response = await api.delete(`/habits/${habitId}/complete`);

  return response.data;
};

export const updateHabit = async (
  habitId: number,
  data: UpdateHabitData,
) => {
  const response = await api.patch<Habit>(
    `/habits/${habitId}`,
    data,
  );

  return response.data;
};

export const getHabitStreak = async (
  habitId: number,
): Promise<HabitStreak> => {
  const response = await api.get<HabitStreak>(
    `/habits/${habitId}/streak`,
  );

  return response.data;
};

export const getHabitHistory = async (
  habitId: number,
): Promise<HabitHistoryEntry[]> => {
  const response = await api.get<HabitHistoryEntry[]>(
    `/habits/${habitId}/history`,
  );

  return response.data;
};