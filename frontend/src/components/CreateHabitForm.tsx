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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          {...register('title', {
            required: 'Title is required',
          })}
        />

        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          {...register('description')}
        />
      </div>

      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Creating...' : 'Create habit'}
      </button>

      {createMutation.isError && (
        <p>Failed to create habit. Please try again.</p>
      )}
    </form>
  );
}

export default CreateHabitForm;