import type { GalleryItem } from "../types/gallery.types";
import { GalleryCard } from "./GalleryCard";
export function GalleryGrid({ items }: { items: GalleryItem[] }) { return items.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <GalleryCard key={item.id} item={item} />)}</div> : <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center text-sm text-muted-foreground">No encontramos imágenes con esos criterios.</div>; }
