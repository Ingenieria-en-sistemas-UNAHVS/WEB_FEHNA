export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-white/10 border-t-accent animate-spin" />
        <p className="text-white/40 text-sm">Cargando panel...</p>
      </div>
    </div>
  );
}
