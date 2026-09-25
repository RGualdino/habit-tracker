import { useQuery } from '@tanstack/react-query';
import { getHabits } from '../api/habits';
import HabitCard from '../components/HabitCard';

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
    return <p>Loading habits...</p>;
  }

  if (isError) {
    return <p>Something went wrong while loading your habits.</p>;
  }

  return (
    <div>
      <h1>My Habits</h1>

      {habits?.length === 0 ? (
        <p>You don't have any habits yet.</p>
      ) : (
        habits?.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))
      )}
    </div>
  );
}

export default Dashboard;