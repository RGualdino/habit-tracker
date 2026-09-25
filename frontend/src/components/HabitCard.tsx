import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Habit } from '../api/habits';
import {
  completeHabit,
  uncompleteHabit,
  deleteHabit,
} from '../api/habits';
import EditHabitForm from './EditHabitForm';
import HabitStreak from './HabitStreak';
import HabitHistory from './HabitHistory';

interface HabitCardProps {
  habit: Habit;
}

function HabitCard({ habit }: HabitCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const completeMutation = useMutation({
    mutationFn: completeHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits'],
      });
      queryClient.invalidateQueries({
        queryKey: ['habit-streak', habit.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['habit-history', habit.id],
      });
    },
  });

  const uncompleteMutation = useMutation({
    mutationFn: uncompleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits'],
      });
      queryClient.invalidateQueries({
        queryKey: ['habit-streak', habit.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['habit-history', habit.id],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits'],
      });
    },
  });

  const isPending =
    completeMutation.isPending || 
    uncompleteMutation.isPending || 
    deleteMutation.isPending;

  const handleToggleComplete = () => {
    if (habit.completedToday) {
      uncompleteMutation.mutate(habit.id);
    } else {
      completeMutation.mutate(habit.id);
    }
  };

  if (isEditing) {
    return (
      <EditHabitForm
        habit={habit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">{habit.title}</h2>

      {habit.description && <p className="mt-1 text-gray-600">{habit.description}</p>}

      <div className="mt-4 space-y-2">
        <HabitStreak habitId={habit.id} />
        <HabitHistory habitId={habit.id} />
      </div>

      <div className="mt-4 flex space-x-2">
        <button
            type="button"
            onClick={handleToggleComplete}
            disabled={isPending}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {habit.completedToday
            ? '✓ Completed today'
            : 'Mark as complete'}
        </button>
        <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
            Edit
        </button>
        <button
            type="button"
            onClick={() => deleteMutation.mutate(habit.id)}
            disabled={isPending}
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

export default HabitCard;