import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHabit } from '../api/habits';
import type { CreateHabitData } from '../api/habits';

function CreateHabitForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateHabitData>();

  const createMutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits'],
      });

      reset();
    },
  });

  const onSubmit = (data: CreateHabitData) => {
    createMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        Create a habit
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>

          <input
            id="title"
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
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="mt-5 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {createMutation.isPending ? 'Creating...' : 'Create habit'}
      </button>

      {createMutation.isError && (
        <p className="mt-2 text-sm text-red-600">
          Failed to create habit. Please try again.
        </p>
      )}
    </form>
  );
}

export default CreateHabitForm;