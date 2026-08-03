import { DISCIPLINE_LABELS } from "../config/event-options";
import {
  Badge,
  DetailAffordance,
  EventDateBlock,
  EventVisual,
  LocationLabel,
  ParticipantsLabel,
  SponsorSummary,
  Tag,
  type EventCardContentProps,
} from "./EventCardParts";

export function EventListCardContent({
  event,
  temporalLabel,
  typeLabel,
  typeClassName,
  hasLink,
}: EventCardContentProps) {
  const disciplines = event.disciplines.slice(0, 2);
  const categories = event.participantCategories.slice(0, 3);

  return (
    <div className="grid md:grid-cols-[190px_1fr] xl:grid-cols-[210px_1fr_180px]">
      <div className="relative min-h-44 overflow-hidden border-b border-white/10 bg-secondary md:min-h-full md:border-b-0 md:border-r">
        <EventVisual event={event} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061529]/95 via-[#061529]/35 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <EventDateBlock event={event} inverted />
        </div>
      </div>

      <div className="min-w-0 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={typeClassName}>{typeLabel}</Badge>
          <span className="text-xs font-medium text-[#9bc4db]">{temporalLabel}</span>
          <span className="text-xs text-white/30" aria-hidden="true">•</span>
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
            {event.code}
          </span>
        </div>

        <h2
          className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.02em] text-white sm:text-4xl"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {event.name}
        </h2>
        {event.description && (
          <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-[#9bc4db]">
            {event.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {disciplines.map((discipline) => (
            <Tag key={discipline}>{DISCIPLINE_LABELS[discipline]}</Tag>
          ))}
          {categories.map((category) => (
            <Tag key={category.id} muted>
              {category.label}
            </Tag>
          ))}
          {event.participantCategories.length > categories.length && (
            <Tag muted>+{event.participantCategories.length - categories.length}</Tag>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-5 gap-y-3 xl:hidden">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#9bc4db]">
            {event.location && <LocationLabel location={event.location} />}
            <ParticipantsLabel count={event.participantCount} />
          </div>
          <DetailAffordance hasLink={hasLink} />
        </div>
      </div>

      <div className="hidden border-l border-white/10 bg-[#081b32] p-5 xl:flex xl:flex-col xl:justify-between">
        <div className="space-y-4 text-sm text-[#9bc4db]">
          {event.location && <LocationLabel location={event.location} />}
          <ParticipantsLabel count={event.participantCount} />
          <SponsorSummary event={event} />
        </div>
        <div className="mt-6 border-t border-white/10 pt-4">
          <DetailAffordance hasLink={hasLink} />
        </div>
      </div>
    </div>
  );
}
