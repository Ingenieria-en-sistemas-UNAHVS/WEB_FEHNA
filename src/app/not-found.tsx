import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-sm text-center">
        <div className="text-8xl font-black text-accent mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          404
        </div>
        <h1 className="text-2xl font-black text-white uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Página no encontrada
        </h1>
        <p className="text-white/50 text-sm mb-6">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-[#061529] font-bold rounded hover:bg-white transition-all duration-200 text-sm"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
        >
          VOLVER AL INICIO
        </Link>
      </div>
    </div>
  );
}
