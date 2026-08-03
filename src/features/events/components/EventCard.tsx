import Link from "next/link";
import { EVENT_TYPE_META } from "../config/event-options";
import { getEventTemporalState } from "../lib/event-date";
import type { CalendarEvent } from "../types/event.types";
import { EventCompactCardContent } from "./EventCompactCard";
import { EventFeaturedCardContent } from "./EventFeaturedCard";
import { EventListCardContent } from "./EventListCard";

type EventCardVariant = "featured" | "compact" | "list";

interface EventCardProps {
  event: CalendarEvent;
  variant?: EventCardVariant;
  href?: string;
  className?: string;
}

const TEMPORAL_LABELS = {
  upcoming: "Próximo",
  ongoing: "En curso",
  past: "Finalizado",
} as const;

export function EventCard({
  event,
  variant = "list",
  href,
  className = "",
}: EventCardProps) {
  const typeMeta = EVENT_TYPE_META[event.type];
  const temporalState = getEventTemporalState(event);
  const wrapperClassName = [
    "group relative overflow-hidden rounded-2xl border border-white/10 bg-card",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    href
      ? "transition duration-300 hover:border-accent/45 motion-reduce:transition-none"
      : "",
    variant === "featured" ? "block min-h-[430px]" : "",
    variant === "compact" ? "block min-h-[196px]" : "",
    variant === "list" ? "block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentProps = {
    event,
    temporalLabel: TEMPORAL_LABELS[temporalState],
    typeLabel: typeMeta.label,
    typeClassName: typeMeta.badgeClassName,
    hasLink: Boolean(href),
  };

  const content =
    variant === "featured" ? (
      <EventFeaturedCardContent {...contentProps} />
    ) : variant === "compact" ? (
      <EventCompactCardContent {...contentProps} />
    ) : (
      <EventListCardContent {...contentProps} />
    );

  if (href) {
    return (
      <Link
        href={href}
        className={wrapperClassName}
        aria-label={`Ver detalle de ${event.name}`}
      >
        {content}
      </Link>
    );
  }

  return <article className={wrapperClassName}>{content}</article>;
}

