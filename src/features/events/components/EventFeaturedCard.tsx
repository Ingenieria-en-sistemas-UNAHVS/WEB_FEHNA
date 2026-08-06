import {
  Badge,
  DetailAffordance,
  EventDateBlock,
  EventVisual,
  LocationLabel,
  ParticipantsLabel,
  SponsorSummary,
  type EventCardContentProps,
} from "./EventCardParts";

export function EventFeaturedCardContent({
  event,
  temporalLabel,
  typeLabel,
  typeClassName,
  hasLink,
}: EventCardContentProps) {
  return (
    <>
      <EventVisual
        event={event}
        className="absolute inset-0"
        sizes="(max-width: 1023px) 100vw, 60vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04101f] via-[#04101f]/70 to-[#04101f]/10" />
      <div className="relative flex min-h-[430px] flex-col justify-between p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge className={typeClassName}>{typeLabel}</Badge>
            <Badge className="bg-[#061529]/80 text-white ring-1 ring-inset ring-white/15 backdrop-blur-sm">
              {temporalLabel}
            </Badge>
          </div>
          <EventDateBlock event={event} inverted />
        </div>

        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {event.code ?? "Código pendiente"}
          </p>
          <h3
            className="mt-3 max-w-[14ch] text-4xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-white sm:text-5xl"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {event.name}
          </h3>
          <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[#c4dceb] sm:text-base">
            {event.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#c4dceb]">
            {event.location && <LocationLabel location={event.location} />}
            <ParticipantsLabel count={event.participantCount} />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
            <SponsorSummary event={event} />
            <DetailAffordance hasLink={hasLink} />
          </div>
        </div>
      </div>
    </>
  );
}
