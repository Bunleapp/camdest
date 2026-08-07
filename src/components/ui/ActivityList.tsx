interface ActivityListProps {
  activities: string[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {activities.map((activity) => (
        <li
          key={activity}
          className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-dark"
        >
          {activity}
        </li>
      ))}
    </ul>
  );
}

// takes a list of word (activities) 
// and display them beautifully as "pills" or tags on the screen