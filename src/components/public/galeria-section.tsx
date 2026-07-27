import { ChevronRight, Play } from "lucide-react";

const GALLERY = [
  { id: 1, src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop&auto=format", alt: "Competencia de natación", span: "col-span-2 row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format", alt: "Nadador en acción", span: "" },
  { id: 3, src: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&h=300&fit=crop&auto=format", alt: "Clavadista en competencia", span: "" },
  { id: 4, src: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop&auto=format", alt: "Entrenamiento acuático", span: "" },
  { id: 5, src: "https://images.unsplash.com/photo-1560090995-5e9c2a9c4fc8?w=400&h=300&fit=crop&auto=format", alt: "Waterpolo partido", span: "" },
  { id: 6, src: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&h=300&fit=crop&auto=format", alt: "Nado sincronizado", span: "col-span-2" },
];

export function GaleriaSection() {
  return (
    <section id="galeria" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-accent text-xs tracking-widest uppercase mb-2">Momentos estelares</div>
            <h2 className="text-5xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Galería Multimedia</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-sm text-accent hover:text-white transition-colors">
            Ver galería completa <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-48">
          {GALLERY.map((item) => (
            <div key={item.id} className={`group relative overflow-hidden rounded-lg bg-secondary cursor-pointer ${item.span}`}>
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-[#061529]/0 group-hover:bg-[#061529]/30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/80 flex items-center justify-center">
                  <Play size={18} className="text-[#061529] ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
