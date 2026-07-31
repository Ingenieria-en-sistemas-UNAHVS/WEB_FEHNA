export type GalleryType = "photo" | "video";
export interface GalleryItem { id: string; src: string; alt: string; title: string; description: string; date: string; author: string; type: GalleryType; competitionName: string; tags: string[]; }
