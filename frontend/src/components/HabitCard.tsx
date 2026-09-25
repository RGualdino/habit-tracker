import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Habit } from '../api/habits';
import {
  completeHabit,
  uncompleteHabit,
  deleteHabit,
} from '../api/habits';
import EditHabitForm from './EditHabitForm';

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
    },
  });

  const uncompleteMutation = useMutation({
    mutationFn: uncompleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits'],
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
    <div>
      <h2>{habit.title}</h2>

      {habit.description && <p>{habit.description}</p>}

      <button
        type="button"
        onClick={handleToggleComplete}
        disabled={isPending}
      >
        {habit.completedToday
          ? '✓ Completed today'
          : 'Mark as complete'}
      </button>

      <button
        type="button"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => deleteMutation.mutate(habit.id)}
        disabled={isPending}
      >
        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default HabitCard;