import { ChevronRight, Clock } from "lucide-react";
import type { NoticiaRow } from "@/lib/data/noticias";

const IMG_DEFECTO = "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=500&fit=crop&auto=format";
const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function fechaLarga(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getDate()} ${MESES[d.getMonth()][0] + MESES[d.getMonth()].slice(1).toLowerCase()} ${d.getFullYear()}`;
}

interface Props {
  noticias: NoticiaRow[];
}

export function NoticiasSection({ noticias }: Props) {
  if (noticias.length === 0) {
    return (
      <section id="noticias" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-accent text-xs tracking-widest uppercase mb-2">Lo más reciente</div>
              <h2 className="text-5xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Noticias & Resultados</h2>
            </div>
          </div>
          <div className="text-center py-16 text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
            Aún no hay noticias publicadas.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-accent text-xs tracking-widest uppercase mb-2">Lo más reciente</div>
            <h2 className="text-5xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Noticias & Resultados</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-sm text-accent hover:text-white transition-colors">
            Ver todas <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg bg-card h-72 lg:h-96">
              <img
                src={noticias[0].imagen_portada || IMG_DEFECTO}
                alt={noticias[0].titulo}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061529] via-[#061529]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-accent text-[#061529] text-xs font-bold px-2 py-0.5 rounded mb-3 tracking-wider uppercase">Noticia</span>
                <h3 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{noticias[0].titulo}</h3>
                <p className="text-white/60 text-sm mt-2 line-clamp-2">{noticias[0].resumen}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-white/40">
                  <Clock size={12} /> {fechaLarga(noticias[0].fecha_publicacion)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {noticias.slice(1).map((n) => (
              <div key={n.id} className="group flex gap-4 p-4 rounded-lg bg-card border border-white/5 hover:border-accent/30 transition-all duration-200 cursor-pointer">
                <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-secondary">
                  <img src={n.imagen_portada || IMG_DEFECTO} alt={n.titulo} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-accent text-xs font-bold tracking-wider uppercase">Noticia</span>
                  <h4 className="text-white text-sm font-semibold mt-1 leading-snug line-clamp-2">{n.titulo}</h4>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock size={10} /> {fechaLarga(n.fecha_publicacion)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
