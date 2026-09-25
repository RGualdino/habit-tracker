import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateHabit } from '../api/habits';
import type { UpdateHabitData, Habit } from '../api/habits';

interface EditHabitFormProps {
  habit: Habit;
  onCancel: () => void;
}

function EditHabitForm({ habit, onCancel }: EditHabitFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateHabitData>({
    defaultValues: {
      title: habit.title,
      description: habit.description ?? '',
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateHabitData) =>
      updateHabit(habit.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits'],
      });

      onCancel();
    },
  });

  const onSubmit = (data: UpdateHabitData) => {
    updateMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={`title-${habit.id}`}>Title</label>

        <input
          id={`title-${habit.id}`}
          type="text"
          {...register('title', {
            required: 'Title is required',
          })}
        />

        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor={`description-${habit.id}`}>
          Description
        </label>

        <textarea
          id={`description-${habit.id}`}
          {...register('description')}
        />
      </div>

      <button
        type="submit"
        disabled={updateMutation.isPending}
      >
        {updateMutation.isPending ? 'Saving...' : 'Save'}
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={updateMutation.isPending}
      >
        Cancel
      </button>

      {updateMutation.isError && (
        <p>Failed to update habit. Please try again.</p>
      )}
    </form>
  );
}

export default EditHabitForm;