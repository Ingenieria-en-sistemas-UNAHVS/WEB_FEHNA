"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-sm text-center">
        <h1 className="text-3xl font-black text-white uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Algo salió mal
        </h1>
        <p className="text-white/50 text-sm mb-6">
          Ocurrió un error inesperado. Por favor intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-accent text-[#061529] font-bold rounded hover:bg-white transition-all duration-200 text-sm"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
        >
          REINTENTAR
        </button>
      </div>
    </div>
  );
}
