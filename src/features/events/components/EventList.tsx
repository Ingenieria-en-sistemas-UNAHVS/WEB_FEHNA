import { EventCard } from "./EventCard";
import type { CalendarEvent } from "../types/event.types";

interface EventListProps {
  events: CalendarEvent[];
  getEventHref?: (event: CalendarEvent) => string | undefined;
}

export function EventList({ events, getEventHref }: EventListProps) {
  return (
    <div className="space-y-5">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          variant="list"
          href={getEventHref?.(event)}
        />
      ))}
    </div>
  );
}

