import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHabits } from '../api/habits';
import HabitCard from '../components/HabitCard';
import CreateHabitForm from '../components/CreateHabitForm';

function Dashboard() {
  const [isCreating, setIsCreating] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: getHabits,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-600">Loading habits...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-red-600">
          Something went wrong while loading your habits.
        </p>
      </main>
    );
  }

  const habits = data ?? [];
  const habitCount = habits.length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Habits
            </h1>
            <p className="mt-2 text-gray-600">
              Build consistency, one day at a time.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
            {habitCount} {habitCount === 1 ? 'habit' : 'habits'}
          </span>
        </div>
      </header>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Dashboard
          </h2>

          {!isCreating && (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              + Add habit
            </button>
          )}
        </div>

        {isCreating ? (
          <CreateHabitForm
            onCancel={() => setIsCreating(false)}
          />
        ) : habitCount === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-lg font-medium text-gray-900">
              No habits yet
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first habit to start building consistency.
            </p>

            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="mt-5 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Create your first habit
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;