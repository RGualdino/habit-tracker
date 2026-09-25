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
    return <p className="text-sm text-gray-500">Loading streak...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-red-600">
        Failed to load streak.
      </p>
    );
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-gray-700">
        Streak
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-gray-200 bg-white px-3 py-2">
          <p className="text-xs text-gray-500">Current</p>
          <p className="mt-0.5 text-lg font-semibold text-gray-900">
            {data.currentStreak} days
          </p>
        </div>

        <div className="rounded-md border border-gray-200 bg-white px-3 py-2">
          <p className="text-xs text-gray-500">Longest</p>
          <p className="mt-0.5 text-lg font-semibold text-gray-900">
            {data.longestStreak} days
          </p>
        </div>
      </div>
    </div>
  );
}

export default HabitStreak;