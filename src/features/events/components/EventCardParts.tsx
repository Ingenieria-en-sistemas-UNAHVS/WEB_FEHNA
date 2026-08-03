import { ArrowUpRight, MapPin, UsersRound } from "lucide-react";
import { formatEventDateRange, getDateParts } from "../lib/event-date";
import type { CalendarEvent } from "../types/event.types";

export interface EventCardContentProps {
  event: CalendarEvent;
  temporalLabel: string;
  typeLabel: string;
  typeClassName: string;
  hasLink: boolean;
}

function withImageWidth(src: string, width: number): string {
  try {
    const url = new URL(src);
    const sourceWidth = Number(url.searchParams.get("w"));
    const sourceHeight = Number(url.searchParams.get("h"));
    url.searchParams.set("w", String(width));

    if (sourceWidth > 0 && sourceHeight > 0) {
      url.searchParams.set("h", String(Math.round((width * sourceHeight) / sourceWidth)));
    }

    return url.toString();
  } catch {
    return src;
  }
}

export function getResponsiveImageProps(src: string, sizes: string) {
  const isRemoteImage = /^https?:\/\//.test(src);

  return {
    src: isRemoteImage ? withImageWidth(src, 800) : src,
    srcSet: isRemoteImage
      ? [480, 800, 1200]
          .map((width) => `${withImageWidth(src, width)} ${width}w`)
          .join(", ")
      : undefined,
    sizes,
  };
}

export function EventVisual({
  event,
  className,
  sizes = "(max-width: 768px) 100vw, 320px",
}: {
  event: CalendarEvent;
  className?: string;
  sizes?: string;
}) {
  if (event.image) {
    const imageProps = getResponsiveImageProps(event.image.src, sizes);

    return (
      <img
        {...imageProps}
        alt={event.image.alt}
        loading="lazy"
        decoding="async"
        className={`${className ?? ""} h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      />
    );
  }

  return (
    <div className={`${className ?? ""} flex items-center justify-center bg-[#0b2949]`}>
      <span
        className="-rotate-90 whitespace-nowrap text-5xl font-black uppercase tracking-[-0.03em] text-white/10"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        aria-hidden="true"
      >
        {event.code}
      </span>
    </div>
  );
}

export function EventDateBlock({
  event,
  inverted = false,
}: {
  event: CalendarEvent;
  inverted?: boolean;
}) {
  const start = getDateParts(event.startDate);
  const end = event.endDate && event.endDate !== event.startDate
    ? getDateParts(event.endDate)
    : null;
  const sameMonth = end?.month === start.month && end.year === start.year;
  const dayLabel = sameMonth ? `${start.day}–${end.day}` : start.day;

  return (
    <time
      dateTime={event.startDate}
      title={formatEventDateRange(event)}
      className="inline-flex flex-col leading-none"
    >
      <span className={`text-xs font-black tracking-[0.16em] ${inverted ? "text-accent" : "text-primary"}`}>
        {start.month}
      </span>
      <span
        className={`mt-1 text-4xl font-black tracking-[-0.03em] ${inverted ? "text-white" : "text-foreground"}`}
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {dayLabel}
      </span>
      <span className={`mt-1 text-[10px] ${inverted ? "text-[#9bc4db]" : "text-muted-foreground"}`}>
        {start.year}
      </span>
      {end && !sameMonth && (
        <span className={`mt-2 text-[10px] font-bold uppercase tracking-[0.08em] ${inverted ? "text-[#d8ecf7]" : "text-foreground"}`}>
          — {end.day} {end.month} {end.year !== start.year ? end.year : ""}
        </span>
      )}
    </time>
  );
}

export function LocationLabel({ location }: { location: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <MapPin size={14} className="shrink-0 text-accent" aria-hidden="true" />
      <span className="line-clamp-1">{location}</span>
    </span>
  );
}

export function ParticipantsLabel({ count }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <UsersRound size={14} className="shrink-0 text-accent" aria-hidden="true" />
      {count == null ? "Inscripciones por confirmar" : `${count} participantes`}
    </span>
  );
}

export function SponsorSummary({
  event,
  compact = false,
}: {
  event: CalendarEvent;
  compact?: boolean;
}) {
  if (event.sponsors.length === 0) {
    return <span className="text-xs text-[#8db7cf]">Sin patrocinador anunciado</span>;
  }

  const visible = event.sponsors.slice(0, compact ? 1 : 2);
  const remaining = event.sponsors.length - visible.length;
  return (
    <span className="min-w-0 text-xs text-[#8db7cf]">
      <span className="mr-1 text-white/45">Con el apoyo de</span>
      <span className="font-semibold text-[#d8ecf7]">
        {visible.map((sponsor) => sponsor.name).join(" · ")}
        {remaining > 0 ? ` +${remaining}` : ""}
      </span>
    </span>
  );
}

export function DetailAffordance({
  hasLink,
  compact = false,
}: {
  hasLink: boolean;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-bold ${
        hasLink ? "text-accent" : "text-[#9bc4db]"
      }`}
    >
      {hasLink ? "Ver detalle" : compact ? "Detalle pronto" : "Detalle próximamente"}
      {hasLink && <ArrowUpRight size={14} aria-hidden="true" />}
    </span>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${className}`}>
      {children}
    </span>
  );
}

export function Tag({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        muted
          ? "bg-white/5 text-[#a8cce0] ring-1 ring-inset ring-white/10"
          : "bg-accent/10 text-accent ring-1 ring-inset ring-accent/20"
      }`}
    >
      {children}
    </span>
  );
}
