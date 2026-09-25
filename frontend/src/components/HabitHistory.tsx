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
    return <p>Loading history...</p>;
  }

  if (isError || !data) {
    return <p>Failed to load history.</p>;
  }

  if (data.length === 0) {
    return <p>No completed days yet.</p>;
  }

  return (
    <div>
      <h3>History</h3>

      <ul>
        {data.map((entry) => (
          <li key={entry.date}>
            {new Date(entry.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitHistory;