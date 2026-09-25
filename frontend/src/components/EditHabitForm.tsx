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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        Edit habit
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor={`title-${habit.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>

          <input
            id={`title-${habit.id}`}
            type="text"
            {...register('title', {
              required: 'Title is required',
            })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`description-${habit.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id={`description-${habit.id}`}
            rows={3}
            {...register('description')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={updateMutation.isPending}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateMutation.isPending ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {updateMutation.isError && (
        <p className="mt-2 text-sm text-red-600">
          Failed to update habit. Please try again.
        </p>
      )}
    </form>
  );
}

export default EditHabitForm;