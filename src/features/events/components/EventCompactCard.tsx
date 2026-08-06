import {
  Badge,
  DetailAffordance,
  EventDateBlock,
  LocationLabel,
  SponsorSummary,
  type EventCardContentProps,
  getResponsiveImageProps,
} from "./EventCardParts";

export function EventCompactCardContent({
  event,
  temporalLabel,
  typeLabel,
  typeClassName,
  hasLink,
}: EventCardContentProps) {
  return (
    <div className="grid min-h-[196px] grid-cols-[94px_1fr] sm:grid-cols-[112px_1fr]">
      <div className="relative border-r border-white/10 bg-secondary">
        {event.image ? (
          <img
            {...getResponsiveImageProps(event.image.src, "(max-width: 639px) 94px, 112px")}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-75 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : null}
        <div className="absolute inset-0 bg-[#061529]/45" />
        <div className="relative flex h-full flex-col items-center justify-center p-3 text-center">
          <EventDateBlock event={event} inverted />
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={typeClassName}>{typeLabel}</Badge>
            <span className="text-[11px] font-medium text-[#9bc4db]">{temporalLabel}</span>
          </div>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
            {event.code ?? "Código pendiente"}
          </p>
          <h3
            className="mt-1 text-2xl font-black uppercase leading-none tracking-[-0.02em] text-white sm:text-3xl"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {event.name}
          </h3>
          {event.location && (
            <div className="mt-3 text-xs text-[#9bc4db]">
              <LocationLabel location={event.location} />
            </div>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <SponsorSummary event={event} compact />
          <DetailAffordance hasLink={hasLink} compact />
        </div>
      </div>
    </div>
  );
}
