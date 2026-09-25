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
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

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
    <article
    className={`relative rounded-lg border p-5 shadow-sm transition-colors ${
        habit.completedToday
        ? 'border-green-200 bg-green-50/30'
        : 'border-gray-200 bg-white'
    }`}
    >
      <div className={isConfirmingDelete ? 'pointer-events-none opacity-40' : ''}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {habit.title}
            </h2>

            {habit.description && (
              <p className="mt-1 text-sm text-gray-600">
                {habit.description}
              </p>
            )}
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
              habit.completedToday
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {habit.completedToday ? 'Completed' : 'Not completed'}
          </span>
        </div>

        <div className="mt-5 rounded-md bg-gray-50 p-4">
          <div className="space-y-2">
            <HabitStreak habitId={habit.id} />
            <HabitHistory habitId={habit.id} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleToggleComplete}
            disabled={isPending}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {completeMutation.isPending || uncompleteMutation.isPending
              ? 'Updating...'
              : habit.completedToday
                ? '✓ Completed today'
                : 'Mark as complete'}
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isPending}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => setIsConfirmingDelete(true)}
            disabled={isPending}
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      {isConfirmingDelete && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/90 p-6 backdrop-blur-sm">
          <div className="w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete "{habit.title}"?
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              This action cannot be undone.
            </p>

            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(false)}
                disabled={deleteMutation.isPending}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => deleteMutation.mutate(habit.id)}
                disabled={deleteMutation.isPending}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default HabitCard;