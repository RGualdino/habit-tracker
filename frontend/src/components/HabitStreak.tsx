import { useQuery } from '@tanstack/react-query';
import { getHabitStreak } from '../api/habits';

interface HabitStreakProps {
  habitId: number;
}

function HabitStreak({ habitId }: HabitStreakProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['habit-streak', habitId],
    queryFn: () => getHabitStreak(habitId),
  });

  if (isLoading) {
    return <p>Loading streak...</p>;
  }

  if (isError || !data) {
    return <p>Failed to load streak.</p>;
  }

  return (
    <div>
      <p>Current streak: {data.currentStreak} days</p>
      <p>Longest streak: {data.longestStreak} days</p>
    </div>
  );
}

export default HabitStreak;