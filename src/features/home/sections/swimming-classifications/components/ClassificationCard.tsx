import type { SwimmingClassification } from "../types/classification.types";

// Card de una clasificación. Cualquier campo opcional puede faltar sin
// romper la composición: la card se adapta a lo que haya.
export function ClassificationCard({
  nombre,
  descripcion,
  imageUrl,
  desde,
}: SwimmingClassification) {
  return (
    <article className="group bg-card rounded-xl border border-white/10 overflow-hidden hover:border-accent/40 transition-all duration-300 flex flex-col">
      <div className="relative h-44 overflow-hidden bg-secondary">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={nombre}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          // Sin imagen: marcador con la inicial para no dejar el hueco vacío.
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/25 to-accent/10">
            <span
              className="text-6xl font-black text-white/15"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {nombre.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {desde && (
          <span className="absolute top-3 right-3 bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-2 py-0.5 rounded tracking-wider">
            DESDE {desde}
          </span>
        )}
      </div>

      <div className="p-6 pt-4 flex flex-col gap-2 flex-1">
        <h3
          className="text-2xl font-black text-white uppercase group-hover:text-accent transition-colors duration-200"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {nombre}
        </h3>

        {descripcion && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {descripcion}
          </p>
        )}
      </div>
    </article>
  );
}
