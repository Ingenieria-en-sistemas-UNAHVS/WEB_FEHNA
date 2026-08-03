export type EventType = "competition" | "practice" | "friendly";

export type SwimmingDiscipline =
  | "swimming"
  | "diving"
  | "water_polo"
  | "artistic_swimming"
  | "open_water";

export interface EventSponsor {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface ParticipantCategory {
  id: string;
  label: string;
  ageRange?: string;
}

export interface EventImage {
  src: string;
  alt: string;
}

export interface CalendarEvent {
  id: string;
  code: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  type: EventType;
  image?: EventImage;
  sponsors: EventSponsor[];
  disciplines: SwimmingDiscipline[];
  participantCategories: ParticipantCategory[];
  participantCount?: number;
}

export interface EventFiltersState {
  query: string;
  date: string;
  discipline: SwimmingDiscipline | "";
  participantCategory: string;
}

export type EventTemporalState = "upcoming" | "ongoing" | "past";

