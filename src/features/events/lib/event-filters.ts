import { isDateWithinEvent, sortEventsForDirectory } from "./event-date";
import type {
  CalendarEvent,
  EventFiltersState,
} from "../types/event.types";

export const EMPTY_EVENT_FILTERS: EventFiltersState = {
  query: "",
  date: "",
  discipline: "",
  participantCategory: "",
};

export function filterEvents(
  events: CalendarEvent[],
  filters: EventFiltersState,
  today = new Date(),
): CalendarEvent[] {
  const query = filters.query.trim().toLocaleLowerCase("es");

  const filtered = events.filter((event) => {
    const searchable = `${event.name} ${event.code ?? ""} ${event.location ?? ""}`
      .toLocaleLowerCase("es");
    const matchesQuery = !query || searchable.includes(query);
    const matchesDate = isDateWithinEvent(event, filters.date);
    const matchesDiscipline =
      !filters.discipline || event.disciplines.includes(filters.discipline);
    const matchesParticipantCategory =
      !filters.participantCategory ||
      event.participantCategories.some(
        (category) => category.id === filters.participantCategory,
      );

    return (
      matchesQuery &&
      matchesDate &&
      matchesDiscipline &&
      matchesParticipantCategory
    );
  });

  return sortEventsForDirectory(filtered, today);
}

export function hasEventFilters(filters: EventFiltersState): boolean {
  return Boolean(
    filters.query ||
      filters.date ||
      filters.discipline ||
      filters.participantCategory,
  );
}
