import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Habit } from '../api/habits';
import {
  completeHabit,
  uncompleteHabit,
} from '../api/habits';

interface HabitCardProps {
  habit: Habit;
}

function HabitCard({ habit }: HabitCardProps) {
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

  const isPending =
    completeMutation.isPending || uncompleteMutation.isPending;

  const handleToggleComplete = () => {
    if (habit.completedToday) {
      uncompleteMutation.mutate(habit.id);
    } else {
      completeMutation.mutate(habit.id);
    }
  };

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
    </div>
  );
}

export default HabitCard;