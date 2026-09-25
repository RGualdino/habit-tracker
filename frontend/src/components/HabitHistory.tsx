import { useQuery } from '@tanstack/react-query';
import { getHabitHistory } from '../api/habits';

interface HabitHistoryProps {
  habitId: number;
}

function HabitHistory({ habitId }: HabitHistoryProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['habit-history', habitId],
    queryFn: () => getHabitHistory(habitId),
  });

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading history...</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-red-600">Failed to load history.</p>;
  }

  const completedDates = new Set(
    data.map((entry) => entry.date.slice(0, 10)),
  );

  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (13 - index));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return {
      date,
      dateKey: `${year}-${month}-${day}`,
    };
  });

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-700">
        Last 14 days
      </h3>

      <div className="grid grid-cols-7 gap-2">
        {days.map(({ date, dateKey }) => {
          const completed = completedDates.has(dateKey);

          return (
            <div
              key={dateKey}
              className={`flex min-h-20 flex-col items-center justify-center rounded-md p-2 ${
                completed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-gray-400'
              }`}
            >
              <span className="text-xs font-medium">
                {date.toLocaleDateString(undefined, {
                  weekday: 'short',
                })}
              </span>

              <span className="mt-1 text-lg">
                {completed ? '✓' : '·'}
              </span>

              <span className="text-xs">
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {data.length === 0 && (
        <p className="mt-3 text-xs text-gray-500">
          No completed days yet.
        </p>
      )}
    </div>
  );
}

export default HabitHistory;