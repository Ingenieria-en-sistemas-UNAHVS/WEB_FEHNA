import type {
  CalendarEvent,
  EventTemporalState,
} from "../types/event.types";

const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("es-HN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const DAY_FORMATTER = new Intl.DateTimeFormat("es-HN", { day: "2-digit" });
const MONTH_FORMATTER = new Intl.DateTimeFormat("es-HN", { month: "short" });

/** Convierte YYYY-MM-DD a fecha local para evitar desplazamientos por zona horaria. */
export function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function cleanDateLabel(value: string): string {
  return value.replace(/\./g, "");
}

export function getEventTemporalState(
  event: CalendarEvent,
  today = new Date(),
): EventTemporalState {
  const current = startOfDay(today).getTime();
  const start = parseDateOnly(event.startDate).getTime();
  const end = parseDateOnly(event.endDate ?? event.startDate).getTime();

  if (current < start) return "upcoming";
  if (current > end) return "past";
  return "ongoing";
}

export function formatEventDateRange(event: CalendarEvent): string {
  const start = cleanDateLabel(FULL_DATE_FORMATTER.format(parseDateOnly(event.startDate)));
  if (!event.endDate || event.endDate === event.startDate) return start;

  const end = cleanDateLabel(FULL_DATE_FORMATTER.format(parseDateOnly(event.endDate)));
  return `${start} — ${end}`;
}

export interface EventDateParts {
  day: string;
  month: string;
  year: string;
}

export function getDateParts(value: string): EventDateParts {
  const date = parseDateOnly(value);
  return {
    day: DAY_FORMATTER.format(date),
    month: cleanDateLabel(MONTH_FORMATTER.format(date)).toUpperCase(),
    year: String(date.getFullYear()),
  };
}

export function isDateWithinEvent(event: CalendarEvent, value: string): boolean {
  if (!value) return true;
  const selected = parseDateOnly(value).getTime();
  const start = parseDateOnly(event.startDate).getTime();
  const end = parseDateOnly(event.endDate ?? event.startDate).getTime();
  return selected >= start && selected <= end;
}

export function selectHomeEvents(
  events: CalendarEvent[],
  today = new Date(),
  limit = 3,
): CalendarEvent[] {
  const safeLimit = Math.max(0, limit);
  if (safeLimit === 0) return [];

  const activeOrUpcoming = [...events]
    .filter((event) => getEventTemporalState(event, today) !== "past")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const recentPast = [...events]
    .filter((event) => getEventTemporalState(event, today) === "past")
    .sort((a, b) =>
      (b.endDate ?? b.startDate).localeCompare(a.endDate ?? a.startDate),
    );

  return [...activeOrUpcoming, ...recentPast].slice(0, safeLimit);
}

export function sortEventsForDirectory(
  events: CalendarEvent[],
  today = new Date(),
): CalendarEvent[] {
  const weight: Record<EventTemporalState, number> = {
    ongoing: 0,
    upcoming: 1,
    past: 2,
  };

  return [...events].sort((a, b) => {
    const stateA = getEventTemporalState(a, today);
    const stateB = getEventTemporalState(b, today);
    if (weight[stateA] !== weight[stateB]) return weight[stateA] - weight[stateB];

    if (stateA === "past") {
      return (b.endDate ?? b.startDate).localeCompare(a.endDate ?? a.startDate);
    }
    return a.startDate.localeCompare(b.startDate);
  });
}
