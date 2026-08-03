import type {
  EventType,
  ParticipantCategory,
  SwimmingDiscipline,
} from "../types/event.types";

export const EVENT_TYPE_META: Record<
  EventType,
  { label: string; badgeClassName: string }
> = {
  competition: {
    label: "Competencia",
    badgeClassName: "bg-accent text-[#061529]",
  },
  practice: {
    label: "Práctica",
    badgeClassName: "bg-white/10 text-white/80 ring-1 ring-inset ring-white/15",
  },
  friendly: {
    label: "Competencia amistosa",
    badgeClassName: "bg-[#7aadcc]/15 text-[#9bd7f4] ring-1 ring-inset ring-[#7aadcc]/25",
  },
};

export const DISCIPLINE_OPTIONS: ReadonlyArray<{
  value: SwimmingDiscipline;
  label: string;
}> = [
  { value: "swimming", label: "Natación" },
  { value: "diving", label: "Clavados" },
  { value: "water_polo", label: "Waterpolo" },
  { value: "artistic_swimming", label: "Natación artística" },
  { value: "open_water", label: "Aguas abiertas" },
];

export const PARTICIPANT_CATEGORY_OPTIONS: ReadonlyArray<ParticipantCategory> = [
  { id: "infantil", label: "Infantil", ageRange: "8–12 años" },
  { id: "juvenil", label: "Juvenil", ageRange: "13–17 años" },
  { id: "abierta", label: "Abierta", ageRange: "18 años en adelante" },
  { id: "master", label: "Máster", ageRange: "25 años en adelante" },
];

export const DISCIPLINE_LABELS = Object.fromEntries(
  DISCIPLINE_OPTIONS.map((option) => [option.value, option.label]),
) as Record<SwimmingDiscipline, string>;

