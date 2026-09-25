import { useQuery } from '@tanstack/react-query';
import { getHabits } from '../api/habits';
import HabitCard from '../components/HabitCard';
import CreateHabitForm from '../components/CreateHabitForm';

function Dashboard() {
  const {
    data: habits,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: getHabits,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-600">Loading habits...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-red-600">
          Something went wrong while loading your habits.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Habits</h1>
        <p className="mt-2 text-gray-600">
          Build consistency, one day at a time.
        </p>
      </header>

      <CreateHabitForm />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Your habits
        </h2>

        {habits?.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-600">
              You don't have any habits yet.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Create your first habit above to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {habits?.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;