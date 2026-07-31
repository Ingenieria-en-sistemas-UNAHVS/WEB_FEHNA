import { ABOUT_INTRO } from "../data/about-content";

export function AboutIntroSection() {
  return <section className="border-b border-white/10 pb-16 pt-20"><div className="mx-auto max-w-4xl px-4"><div className="mb-2 text-xs uppercase tracking-widest text-accent">{ABOUT_INTRO.eyebrow}</div><h1 className="text-5xl font-black uppercase leading-none text-white md:text-6xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{ABOUT_INTRO.titulo}</h1><p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{ABOUT_INTRO.entradilla}</p></div></section>;
}
