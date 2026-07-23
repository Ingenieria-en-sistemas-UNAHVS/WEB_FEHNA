import { useState, useEffect, useMemo } from "react";
import { Menu, X, ChevronRight, Calendar, Users, Trophy, Play, Mail, Phone, MapPin, ArrowRight, Star, Clock, Globe, ChevronDown } from "lucide-react";
import { AdminLink } from "./components/AdminLink";
import { useNoticiasPublicas, useEventosPublicos, useAtletas, useTiemposPublicos } from "@/lib/usePublic";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Noticias", href: "#noticias" },
  { label: "Calendario", href: "#calendario" },
  { label: "Atletas", href: "#atletas" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

const NEWS = [
  {
    id: 1,
    category: "Campeonato",
    title: "Honduras domina en los Juegos Centroamericanos de Natación 2025",
    excerpt: "La delegación hondureña obtuvo 12 medallas de oro en la edición más competida de los Juegos Centroamericanos celebrada en Ciudad de Guatemala.",
    date: "10 Jul 2025",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=500&fit=crop&auto=format",
    featured: true,
  },
  {
    id: 2,
    category: "Resultados",
    title: "Karla Mendoza rompe récord nacional en 100m mariposa",
    excerpt: "Con un tiempo de 57.43 segundos, la nadadora capitalina establece una nueva marca histórica para el país.",
    date: "5 Jul 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format",
    featured: false,
  },
  {
    id: 3,
    category: "Selección",
    title: "Convocatoria oficial para el Campeonato Panamericano de Lima",
    excerpt: "La Fenah anuncia los 24 atletas seleccionados para representar a Honduras en el torneo continental de agosto.",
    date: "1 Jul 2025",
    image: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800&h=500&fit=crop&auto=format",
    featured: false,
  },
  {
    id: 4,
    category: "Waterpolo",
    title: "Equipo masculino de waterpolo clasifica al Regional UANA",
    excerpt: "Con cuatro victorias consecutivas, Los Tiburones de Honduras consiguen su pase al torneo regional de la UANA.",
    date: "28 Jun 2025",
    image: "https://images.unsplash.com/photo-1618019852954-af0a02f40fd0?w=800&h=500&fit=crop&auto=format",
    featured: false,
  },
];

const EVENTS = [
  { date: "20 Jul", month: "JUL", title: "Campeonato Nacional Juvenil", location: "Tegucigalpa", discipline: "Natación", type: "Nacional", level: "Juvenil" },
  { date: "2 Ago", month: "AGO", title: "Copa Honduras Open", location: "San Pedro Sula", discipline: "Natación", type: "Nacional", level: "Absoluta" },
  { date: "14 Ago", month: "AGO", title: "Panamericano Corta Distancia", location: "Lima, Perú", discipline: "Natación", type: "Internacional", level: "Absoluta" },
  { date: "21 Ago", month: "AGO", title: "Torneo Regional de Clavados", location: "Ciudad de Guatemala", discipline: "Clavados", type: "Internacional", level: "Juvenil" },
  { date: "5 Sep", month: "SEP", title: "Liga Nacional de Waterpolo", location: "Comayagüela", discipline: "Waterpolo", type: "Nacional", level: "Absoluta" },
  { date: "18 Sep", month: "SEP", title: "Campeonato Centroamericano Sincronizado", location: "San José, Costa Rica", discipline: "Sincronizado", type: "Internacional", level: "Absoluta" },
  { date: "3 Oct", month: "OCT", title: "Clasificatorio Olímpico UANA", location: "Montevideo, Uruguay", discipline: "Natación", type: "Internacional", level: "Absoluta" },
  { date: "15 Oct", month: "OCT", title: "Campeonato Nacional Infantil", location: "La Ceiba", discipline: "Natación", type: "Nacional", level: "Infantil" },
];

const ATHLETES = [
  {
    name: "Karla Mendoza",
    discipline: "Natación",
    specialty: "Mariposa / Libre",
    records: 4,
    medals: 18,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=500&fit=crop&auto=format",
    highlight: "Récord Nacional 100m Mariposa",
    country: "Honduras",
  },
  {
    name: "Diego Flores",
    discipline: "Clavados",
    specialty: "Trampolín 3m / 10m",
    records: 2,
    medals: 11,
    image: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=400&h=500&fit=crop&auto=format",
    highlight: "Campeón Centroamericano 2024",
    country: "Honduras",
  },
  {
    name: "Sofía Rivera",
    discipline: "Sincronizado",
    specialty: "Solo / Dueto",
    records: 1,
    medals: 9,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&auto=format",
    highlight: "Subcampeona Panamericana",
    country: "Honduras",
  },
  {
    name: "Marco Lara",
    discipline: "Natación",
    specialty: "Espalda / Combinado",
    records: 3,
    medals: 15,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&auto=format",
    highlight: "Clasificatorio Olímpico Paris 2024",
    country: "Honduras",
  },
];

const GALLERY = [
  { id: 1, src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop&auto=format", alt: "Competencia de natación", span: "col-span-2 row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format", alt: "Nadador en acción", span: "" },
  { id: 3, src: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&h=300&fit=crop&auto=format", alt: "Clavadista en competencia", span: "" },
  { id: 4, src: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop&auto=format", alt: "Entrenamiento acuático", span: "" },
  { id: 5, src: "https://images.unsplash.com/photo-1560090995-5e9c2a9c4fc8?w=400&h=300&fit=crop&auto=format", alt: "Waterpolo partido", span: "" },
  { id: 6, src: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&h=300&fit=crop&auto=format", alt: "Nado sincronizado", span: "col-span-2" },
];

const SPONSORS = [
  { name: "Banco Atlántida", tier: "Platino" },
  { name: "Cerveza Salva Vida", tier: "Platino" },
  { name: "Tigo Honduras", tier: "Oro" },
  { name: "BANPAIS", tier: "Oro" },
  { name: "Secretaría de Deportes", tier: "Oro" },
  { name: "COH", tier: "Plata" },
  { name: "Agua Crystal", tier: "Plata" },
  { name: "Speedo Honduras", tier: "Plata" },
];

const DISCIPLINES = ["Todos", "Natación", "Clavados", "Waterpolo", "Sincronizado"];

const PRUEBAS = ["Todas", "50m Libre", "100m Libre", "200m Libre", "100m Mariposa", "200m Mariposa", "100m Espalda", "200m Espalda", "100m Pecho", "200m Individual"];
const CATEGORIAS_TABLA = ["Todas", "Infantil", "Juvenil", "Junior", "Absoluta"];

const TIEMPOS: {
  pos: number; nombre: string; club: string; departamento: string;
  categoria: string; prueba: string; tiempo: string; fecha: string; lugar: string; record: boolean;
}[] = [
  { pos: 1, nombre: "Karla Mendoza",      club: "Club Depor Tegucigalpa", departamento: "Francisco Morazán", categoria: "Absoluta",  prueba: "100m Mariposa",    tiempo: "57.43", fecha: "05 Jul 2025", lugar: "Tegucigalpa",         record: true  },
  { pos: 2, nombre: "Lucía Aguilar",      club: "Natación SPS",           departamento: "Cortés",            categoria: "Absoluta",  prueba: "100m Mariposa",    tiempo: "58.91", fecha: "05 Jul 2025", lugar: "Tegucigalpa",         record: false },
  { pos: 3, nombre: "Daniela Reyes",      club: "Club Aqua Choluteca",    departamento: "Choluteca",         categoria: "Absoluta",  prueba: "100m Mariposa",    tiempo: "59.07", fecha: "05 Jul 2025", lugar: "Tegucigalpa",         record: false },
  { pos: 1, nombre: "Marco Lara",         club: "Tigres Acuáticos",       departamento: "Cortés",            categoria: "Absoluta",  prueba: "100m Espalda",     tiempo: "54.12", fecha: "28 Jun 2025", lugar: "San Pedro Sula",      record: false },
  { pos: 2, nombre: "Óscar Fuentes",      club: "Club Depor Tegucigalpa", departamento: "Francisco Morazán", categoria: "Absoluta",  prueba: "100m Espalda",     tiempo: "54.88", fecha: "28 Jun 2025", lugar: "San Pedro Sula",      record: false },
  { pos: 3, nombre: "Bryan Castellanos",  club: "Natación Comayagua",     departamento: "Comayagua",         categoria: "Absoluta",  prueba: "100m Espalda",     tiempo: "55.34", fecha: "28 Jun 2025", lugar: "San Pedro Sula",      record: false },
  { pos: 1, nombre: "Sofía Rivera",       club: "Club Acuático La Ceiba", departamento: "Atlántida",         categoria: "Junior",    prueba: "200m Individual",  tiempo: "2:14.56", fecha: "20 Jun 2025", lugar: "La Ceiba",           record: true  },
  { pos: 2, nombre: "Valeria Cruz",       club: "Tiburones del Norte",    departamento: "Cortés",            categoria: "Junior",    prueba: "200m Individual",  tiempo: "2:16.10", fecha: "20 Jun 2025", lugar: "La Ceiba",           record: false },
  { pos: 3, nombre: "Andrea Pineda",      club: "Club Aqua Choluteca",    departamento: "Choluteca",         categoria: "Junior",    prueba: "200m Individual",  tiempo: "2:18.45", fecha: "20 Jun 2025", lugar: "La Ceiba",           record: false },
  { pos: 1, nombre: "Diego Flores",       club: "Tigres Acuáticos",       departamento: "Cortés",            categoria: "Absoluta",  prueba: "200m Mariposa",    tiempo: "1:58.23", fecha: "15 Jun 2025", lugar: "San Pedro Sula",     record: false },
  { pos: 1, nombre: "Camila Martínez",    club: "Club Acuático La Ceiba", departamento: "Atlántida",         categoria: "Juvenil",   prueba: "100m Libre",       tiempo: "58.34", fecha: "10 Jun 2025", lugar: "La Ceiba",            record: false },
  { pos: 2, nombre: "Paola Herrera",      club: "Natación SPS",           departamento: "Cortés",            categoria: "Juvenil",   prueba: "100m Libre",       tiempo: "59.01", fecha: "10 Jun 2025", lugar: "La Ceiba",            record: false },
  { pos: 3, nombre: "Fernanda López",     club: "Club Depor Tegucigalpa", departamento: "Francisco Morazán", categoria: "Juvenil",   prueba: "100m Libre",       tiempo: "59.67", fecha: "10 Jun 2025", lugar: "La Ceiba",            record: false },
  { pos: 1, nombre: "Mateo Soriano",      club: "Tiburones del Norte",    departamento: "Cortés",            categoria: "Juvenil",   prueba: "50m Libre",        tiempo: "24.89", fecha: "10 Jun 2025", lugar: "La Ceiba",            record: false },
  { pos: 2, nombre: "Andrés Núñez",       club: "Natación Comayagua",     departamento: "Comayagua",         categoria: "Juvenil",   prueba: "50m Libre",        tiempo: "25.12", fecha: "10 Jun 2025", lugar: "La Ceiba",            record: false },
  { pos: 1, nombre: "Isabella Mendoza",   club: "Club Aqua Choluteca",    departamento: "Choluteca",         categoria: "Infantil",  prueba: "50m Libre",        tiempo: "29.44", fecha: "1 Jun 2025",  lugar: "Choluteca",           record: true  },
  { pos: 2, nombre: "Sara Castillo",      club: "Club Depor Tegucigalpa", departamento: "Francisco Morazán", categoria: "Infantil",  prueba: "50m Libre",        tiempo: "29.98", fecha: "1 Jun 2025",  lugar: "Choluteca",           record: false },
  { pos: 3, nombre: "Renata Paz",         club: "Natación SPS",           departamento: "Cortés",            categoria: "Infantil",  prueba: "50m Libre",        tiempo: "30.21", fecha: "1 Jun 2025",  lugar: "Choluteca",           record: false },
  { pos: 1, nombre: "Emilio Vargas",      club: "Tigres Acuáticos",       departamento: "Cortés",            categoria: "Infantil",  prueba: "100m Pecho",       tiempo: "1:14.33", fecha: "1 Jun 2025", lugar: "Choluteca",           record: false },
  { pos: 1, nombre: "Roberto Mejía",      club: "Club Acuático La Ceiba", departamento: "Atlántida",         categoria: "Junior",    prueba: "200m Libre",       tiempo: "1:52.67", fecha: "25 May 2025", lugar: "Tegucigalpa",        record: false },
];

function RankingsSection() {
  const { tiempos, loading } = useTiemposPublicos();
  const [prueba, setPrueba] = useState("Todas");
  const [categoria, setCategoria] = useState("Todas");
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState<"pos" | "tiempo" | "nombre" | "club">("tiempo");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Opciones de filtro derivadas de los datos reales
  const PRUEBAS = useMemo(
    () => ["Todas", ...Array.from(new Set(tiempos.map((t) => t.prueba).filter(Boolean)))],
    [tiempos]
  );
  const CATEGORIAS_TABLA = useMemo(
    () => ["Todas", ...Array.from(new Set(tiempos.map((t) => t.categoria).filter(Boolean)))],
    [tiempos]
  );

  const filtered = tiempos
    .filter((r) => (prueba === "Todas" || r.prueba === prueba))
    .filter((r) => (categoria === "Todas" || r.categoria === categoria))
    .filter((r) =>
      search === "" ||
      r.nombre.toLowerCase().includes(search.toLowerCase()) ||
      r.club.toLowerCase().includes(search.toLowerCase()) ||
      r.departamento.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let va: string | number = a[sortCol];
      let vb: string | number = b[sortCol];
      if (sortCol === "tiempo") {
        va = a.centesimas;
        vb = b.centesimas;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: typeof sortCol }) => (
    <span className={`ml-1 text-xs ${sortCol === col ? "text-accent" : "text-white/20"}`}>
      {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  const medalColor = (pos: number) =>
    pos === 1 ? "text-yellow-400" : pos === 2 ? "text-slate-300" : pos === 3 ? "text-amber-600" : "text-muted-foreground";

  return (
    <section id="tiempos" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">Rendimiento oficial</div>
          <h2
            className="text-5xl font-black text-white uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Registro de Tiempos
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">
            Mejores marcas por prueba y categoría registradas en competencias oficiales FEHNA 2025.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search */}
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Buscar nadador, club, departamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-white/10 rounded px-4 py-2.5 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/25 pr-8"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                ×
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS_TABLA.map((c) => (
              <button
                key={c}
                onClick={() => setCategoria(c)}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all duration-200 tracking-wider uppercase ${
                  categoria === c
                    ? "bg-accent text-[#061529]"
                    : "border border-white/15 text-white/50 hover:text-white hover:border-white/30"
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Prueba scroll */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {PRUEBAS.map((p) => (
              <button
                key={p}
                onClick={() => setPrueba(p)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  prueba === p
                    ? "bg-primary text-white"
                    : "border border-white/10 text-white/40 hover:text-white hover:border-white/25"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="text-xs text-muted-foreground mb-3">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-secondary border-b border-white/10">
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider w-12">#</th>
                  <th
                    className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none"
                    onClick={() => toggleSort("nombre")}
                  >
                    Nadador <SortIcon col="nombre" />
                  </th>
                  <th
                    className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none"
                    onClick={() => toggleSort("club")}
                  >
                    Club <SortIcon col="club" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Departamento</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Categoría</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Prueba</th>
                  <th
                    className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none"
                    onClick={() => toggleSort("tiempo")}
                  >
                    Tiempo <SortIcon col="tiempo" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Competencia</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-muted-foreground text-sm">
                      {loading
                        ? "Cargando tiempos…"
                        : tiempos.length === 0
                        ? "Aún no hay tiempos registrados."
                        : "No se encontraron resultados para los filtros seleccionados."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-card transition-colors duration-150 group"
                    >
                      <td className="px-4 py-3">
                        <span className={`font-black text-base ${medalColor(r.pos)}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {r.pos === 1 ? "🥇" : r.pos === 2 ? "🥈" : r.pos === 3 ? "🥉" : r.pos}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold group-hover:text-accent transition-colors">{r.nombre}</span>
                          {r.record && (
                            <span className="text-xs bg-accent/20 text-accent border border-accent/30 px-1.5 py-0.5 rounded font-bold tracking-wider">
                              RN
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/70">{r.club}</td>
                      <td className="px-4 py-3 text-white/50 text-xs">{r.departamento}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                          r.categoria === "Absoluta" ? "bg-primary/20 text-[#38d9f5]" :
                          r.categoria === "Junior"   ? "bg-accent/15 text-accent" :
                          r.categoria === "Juvenil"  ? "bg-purple-500/15 text-purple-300" :
                          "bg-white/10 text-white/50"
                        }`}>
                          {r.categoria}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-xs whitespace-nowrap">{r.prueba}</td>
                      <td className="px-4 py-3">
                        <span
                          className="text-white font-black text-base tabular-nums"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {r.tiempo}
                        </span>
                        <span className="text-muted-foreground text-xs ml-1">seg</span>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{r.fecha}</td>
                      <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{r.lugar}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="bg-accent/20 text-accent border border-accent/30 px-1.5 py-0.5 rounded font-bold">RN</span>
            Récord Nacional
          </div>
          <div className="flex items-center gap-1.5">
            <span>🥇🥈🥉</span> Posición en competencia
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            Haz clic en los encabezados para ordenar
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [calendarFilter, setCalendarFilter] = useState("Todos");
  const [activeAthletes, setActiveAthletes] = useState(0);
  const [formData, setFormData] = useState({ nombre: "", email: "", club: "", disciplina: "Natación", categoria: "Juvenil", mensaje: "" });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Datos reales desde Supabase
  const { noticias } = useNoticiasPublicas();
  const { eventos } = useEventosPublicos();
  const { atletas } = useAtletas();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredEvents = calendarFilter === "Todos"
    ? eventos
    : eventos.filter((e) => e.discipline === calendarFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#061529]/95 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <circle cx="20" cy="20" r="18" fill="#061529" />
                <path d="M8 22 Q14 16 20 22 Q26 28 32 22" stroke="#00C8E0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M8 18 Q14 12 20 18 Q26 24 32 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="20" cy="13" r="3" fill="#00C8E0" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-none tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>FEHNA</div>
              <div className="text-accent text-xs leading-none mt-0.5 tracking-widest uppercase">Fed. Hondureña de Natación</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href.slice(1))}
                className="px-4 py-2 text-sm text-white/80 hover:text-accent transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo("calendario")}
              className="px-4 py-2 text-sm border border-white/20 text-white hover:border-accent hover:text-accent transition-all duration-200 rounded"
            >
              Ver Calendario
            </button>
            <button
              onClick={() => scrollTo("registro")}
              className="px-5 py-2 text-sm bg-accent text-[#061529] font-bold hover:bg-white transition-all duration-200 rounded"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              AFÍLIATE
            </button>
          </div>

          {/* Mobile menu */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0a2040] border-t border-white/10 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href.slice(1))}
                className="block w-full text-left px-2 py-3 text-white/80 hover:text-accent border-b border-white/5 last:border-0 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("registro")}
              className="mt-4 w-full py-3 bg-accent text-[#061529] font-bold rounded text-sm tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              AFÍLIATE AHORA
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#061529]">
          <img
            src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&h=900&fit=crop&auto=format"
            alt="Piscina olímpica de Honduras"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061529]/60 via-transparent to-[#061529]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061529] via-transparent to-transparent" />
        </div>

        {/* Animated water lines */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-30">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              style={{
                bottom: `${i * 8 + 4}px`,
                left: "-100%",
                right: "-100%",
                animation: `slideWave ${3 + i * 0.7}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes slideWave {
            0% { transform: translateX(-20%); }
            100% { transform: translateX(20%); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.7s ease forwards; }
          .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
          .fade-up-2 { animation-delay: 0.3s; opacity: 0; }
          .fade-up-3 { animation-delay: 0.5s; opacity: 0; }
          .fade-up-4 { animation-delay: 0.7s; opacity: 0; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-24 w-full">
          <div className="max-w-3xl">
            <div className="fade-up fade-up-1 inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded px-3 py-1 text-accent text-xs tracking-widest uppercase mb-6">
              <Star size={10} fill="currentColor" />
              Federación Oficial · Miembro FINA · UANA
            </div>

            <h1
              className="fade-up fade-up-2 text-6xl md:text-8xl font-black text-white leading-none mb-2 uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}
            >
              Federación
              <br />
              <span className="text-accent">Hondureña</span>
              <br />
              de Natación
            </h1>

            <p className="fade-up fade-up-3 text-lg text-white/70 mt-6 mb-10 leading-relaxed max-w-xl">
              El organismo rector de la natación, clavados, waterpolo y nado sincronizado en Honduras. Formamos campeones, construimos comunidad.
            </p>

            <div className="fade-up fade-up-4 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("registro")}
                className="flex items-center gap-2 px-7 py-4 bg-accent text-[#061529] font-black text-lg rounded hover:bg-white transition-all duration-200"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                AFÍLIATE <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("atletas")}
                className="flex items-center gap-2 px-7 py-4 border border-white/30 text-white font-semibold text-base rounded hover:border-accent hover:text-accent transition-all duration-200"
              >
                Conoce a Nuestros Atletas
              </button>
            </div>

            {/* Stats strip */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { n: "380+", label: "Atletas Activos" },
                { n: "47", label: "Clubes Afiliados" },
                { n: "12", label: "Oros C.A. 2024" },
                { n: "3", label: "Olímpicos Paris 24" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-accent/40 pl-4">
                  <div
                    className="text-3xl font-black text-accent"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {s.n}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Discipline tabs floating */}
        <div className="absolute bottom-0 left-0 right-0 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max border-t border-white/10">
            {["Natación", "Clavados", "Waterpolo", "Nado Sincronizado"].map((d, i) => (
              <div
                key={d}
                className={`px-8 py-4 text-sm font-semibold tracking-wide cursor-default ${
                  i === 0 ? "bg-accent text-[#061529]" : "bg-[#0a2040]/80 text-white/60 hover:text-white transition-colors"
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em", fontSize: "13px" }}
              >
                {d.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTICIAS ── */}
      <section id="noticias" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-accent text-xs tracking-widest uppercase mb-2">Lo más reciente</div>
              <h2
                className="text-5xl font-black text-white uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Noticias & Resultados
              </h2>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-sm text-accent hover:text-white transition-colors">
              Ver todas <ChevronRight size={16} />
            </button>
          </div>

          {noticias.length === 0 ? (
            <div className="text-center py-16 text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
              Aún no hay noticias publicadas.
            </div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured */}
            <div className="lg:col-span-2 group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-card h-72 lg:h-96">
                <img
                  src={noticias[0].image}
                  alt={noticias[0].title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061529] via-[#061529]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-accent text-[#061529] text-xs font-bold px-2 py-0.5 rounded mb-3 tracking-wider uppercase">
                    {noticias[0].category}
                  </span>
                  <h3
                    className="text-2xl font-black text-white leading-tight"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {noticias[0].title}
                  </h3>
                  <p className="text-white/60 text-sm mt-2 line-clamp-2">{noticias[0].excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-white/40">
                    <Clock size={12} />
                    {noticias[0].date}
                  </div>
                </div>
              </div>
            </div>

            {/* Side news */}
            <div className="flex flex-col gap-4">
              {noticias.slice(1).map((n) => (
                <div key={n.id} className="group flex gap-4 p-4 rounded-lg bg-card border border-white/5 hover:border-accent/30 transition-all duration-200 cursor-pointer">
                  <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-secondary">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-accent text-xs font-bold tracking-wider uppercase">{n.category}</span>
                    <h4 className="text-white text-sm font-semibold mt-1 leading-snug line-clamp-2">{n.title}</h4>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock size={10} />
                      {n.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      </section>

      {/* ── CALENDARIO ── */}
      <section id="calendario" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-accent text-xs tracking-widest uppercase mb-2">2025 · 2026</div>
              <h2
                className="text-5xl font-black text-white uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Calendario de Competencias
              </h2>
            </div>
            <button
              onClick={() => scrollTo("registro")}
              className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 bg-accent text-[#061529] font-bold rounded text-sm hover:bg-white transition-all duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              VER CALENDARIO COMPLETO <ArrowRight size={14} />
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {DISCIPLINES.map((d) => (
              <button
                key={d}
                onClick={() => setCalendarFilter(d)}
                className={`px-4 py-1.5 rounded text-sm font-semibold transition-all duration-200 ${
                  calendarFilter === d
                    ? "bg-accent text-[#061529]"
                    : "border border-white/15 text-white/60 hover:text-white hover:border-white/30"
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
              No hay eventos en el calendario por ahora.
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredEvents.map((ev, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-white/5 hover:border-accent/30 transition-all duration-200 group cursor-pointer"
              >
                {/* Date block */}
                <div className="shrink-0 w-14 h-14 bg-accent/10 border border-accent/20 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-accent text-xs font-bold tracking-widest uppercase">{ev.month}</span>
                  <span
                    className="text-white font-black text-xl leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {ev.date.split(" ")[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded font-bold tracking-wider uppercase ${
                      ev.type === "Internacional" ? "bg-[#0077BE]/30 text-[#38d9f5]" : "bg-accent/20 text-accent"
                    }`}>
                      {ev.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{ev.discipline}</span>
                  </div>
                  <h4 className="text-white font-semibold text-base leading-tight group-hover:text-accent transition-colors">{ev.title}</h4>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                    <MapPin size={11} />
                    {ev.location}
                  </div>
                </div>

                <div className="shrink-0 hidden sm:flex items-center">
                  <span className="text-xs border border-white/10 text-white/40 px-2 py-1 rounded">{ev.level}</span>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ── ATLETAS ── */}
      <section id="atletas" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent text-xs tracking-widest uppercase mb-2">Orgullo Nacional</div>
            <h2
              className="text-5xl font-black text-white uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Atletas de Élite
            </h2>
            <p className="text-muted-foreground text-base mt-3 max-w-lg mx-auto">
              Representan a Honduras en los más altos escenarios del deporte acuático mundial.
            </p>
          </div>

          {atletas.length === 0 ? (
            <div className="text-center py-16 text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
              Aún no hay deportistas registrados.
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atletas.map((a, i) => (
              <div
                key={a.id}
                className={`group relative rounded-xl overflow-hidden bg-card border cursor-pointer transition-all duration-300 ${
                  activeAthletes === i ? "border-accent shadow-lg shadow-accent/10" : "border-white/5 hover:border-accent/40"
                }`}
                onClick={() => setActiveAthletes(i)}
              >
                <div className="relative h-40 overflow-hidden bg-secondary flex items-center justify-center">
                  <span
                    className="text-6xl font-black text-white/10"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {a.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </span>
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-accent text-[#061529] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      {a.sexo === "F" ? "Femenino" : "Masculino"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3
                    className="text-xl font-black text-white uppercase leading-tight"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {a.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-0.5">{a.club}</p>

                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
                    <div className="text-center">
                      <div
                        className="text-2xl font-black text-accent"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {a.edad}
                      </div>
                      <div className="text-xs text-muted-foreground">Años</div>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-2xl font-black text-accent"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {a.marcas}
                      </div>
                      <div className="text-xs text-muted-foreground">Marcas</div>
                    </div>
                    <div className="text-center">
                      <Trophy size={14} className="text-accent mx-auto mt-1" />
                      <div className="text-xs text-muted-foreground mt-0.5">FEHNA</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          <div className="text-center mt-10">
            <button className="flex items-center gap-2 mx-auto px-6 py-3 border border-white/20 text-white hover:border-accent hover:text-accent transition-all duration-200 rounded text-sm">
              Ver todos los atletas <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TIEMPOS ── */}
      <RankingsSection />

      {/* ── REGISTRO ── */}
      <section id="registro" className="py-24 bg-secondary relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #00C8E0, transparent)" }}
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-accent text-xs tracking-widest uppercase mb-2">Únete a la familia acuática</div>
              <h2
                className="text-5xl font-black text-white uppercase leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Regístrate
                <br />
                <span className="text-accent">como Nadador</span>
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                Afíliate a la FEHNA y accede a competencias oficiales, programas de desarrollo, entrenadores certificados y representación nacional.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Trophy, text: "Acceso a competencias nacionales e internacionales" },
                  { icon: Users, text: "Red de 47 clubes afiliados en todo Honduras" },
                  { icon: Star, text: "Programas de becas para atletas de alto rendimiento" },
                  { icon: Globe, text: "Representación ante FINA, UANA y COH" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <p className="text-white/70 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-white/10 p-8">
              {formSent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={28} className="text-accent" fill="currentColor" />
                  </div>
                  <h3
                    className="text-3xl font-black text-white uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    ¡Solicitud Enviada!
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Nos pondremos en contacto contigo en las próximas 48 horas.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-6 text-accent text-sm hover:text-white transition-colors"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3
                    className="text-2xl font-black text-white uppercase mb-6"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Formulario de Afiliación
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Nombre completo *</label>
                      <input
                        required
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Correo electrónico *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Club o Asociación</label>
                      <input
                        type="text"
                        value={formData.club}
                        onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                        className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20"
                        placeholder="Nombre del club"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Disciplina</label>
                      <div className="relative">
                        <select
                          value={formData.disciplina}
                          onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                          className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option>Natación</option>
                          <option>Clavados</option>
                          <option>Waterpolo</option>
                          <option>Sincronizado</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Categoría</label>
                      <div className="flex gap-2 flex-wrap">
                        {["Infantil", "Juvenil", "Junior", "Absoluta", "Masters"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setFormData({ ...formData, categoria: c })}
                            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                              formData.categoria === c
                                ? "bg-accent text-[#061529]"
                                : "border border-white/15 text-white/50 hover:text-white"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Mensaje adicional</label>
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        rows={3}
                        className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors resize-none placeholder-white/20"
                        placeholder="Cuéntanos sobre tu experiencia..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-accent text-[#061529] font-black text-lg rounded hover:bg-white transition-all duration-200 tracking-widest uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Enviar Solicitud
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section id="galeria" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-accent text-xs tracking-widest uppercase mb-2">Momentos estelares</div>
              <h2
                className="text-5xl font-black text-white uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Galería Multimedia
              </h2>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-sm text-accent hover:text-white transition-colors">
              Ver galería completa <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-48">
            {GALLERY.map((item) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-lg bg-secondary cursor-pointer ${item.span}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
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

      {/* ── PATROCINADORES ── */}
      <section className="py-16 bg-secondary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-muted-foreground text-xs tracking-widest uppercase">Aliados estratégicos</div>
            <h3
              className="text-3xl font-black text-white uppercase mt-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Nuestros Patrocinadores
            </h3>
          </div>

          {/* Platino */}
          <div className="mb-8">
            <div className="text-center text-xs text-accent/60 tracking-widest uppercase mb-4">Patrocinador Platino</div>
            <div className="flex justify-center gap-6 flex-wrap">
              {SPONSORS.filter((s) => s.tier === "Platino").map((s) => (
                <div
                  key={s.name}
                  className="px-8 py-5 bg-card border border-accent/20 rounded-lg text-white font-bold text-lg hover:border-accent transition-all duration-200 cursor-pointer min-w-[180px] text-center"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>

          {/* Oro */}
          <div className="mb-8">
            <div className="text-center text-xs text-yellow-400/60 tracking-widest uppercase mb-4">Patrocinador Oro</div>
            <div className="flex justify-center gap-4 flex-wrap">
              {SPONSORS.filter((s) => s.tier === "Oro").map((s) => (
                <div
                  key={s.name}
                  className="px-6 py-4 bg-card border border-yellow-400/10 rounded-lg text-white/80 font-semibold text-base hover:border-yellow-400/30 transition-all duration-200 cursor-pointer"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>

          {/* Plata */}
          <div>
            <div className="text-center text-xs text-white/30 tracking-widest uppercase mb-4">Patrocinador Plata</div>
            <div className="flex justify-center gap-3 flex-wrap">
              {SPONSORS.filter((s) => s.tier === "Plata").map((s) => (
                <div
                  key={s.name}
                  className="px-5 py-3 bg-card border border-white/5 rounded-lg text-white/50 font-medium text-sm hover:border-white/20 transition-all duration-200 cursor-pointer"
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="text-accent text-xs tracking-widest uppercase mb-2">Estamos para ayudarte</div>
              <h2
                className="text-5xl font-black text-white uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Contáctanos
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Para consultas sobre afiliación, competencias, patrocinios o cualquier asunto relacionado con la natación hondureña.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  { icon: MapPin, label: "Dirección", value: "Complejo Deportivo Nacional, Col. Miraflores, Tegucigalpa, Honduras" },
                  { icon: Phone, label: "Teléfono", value: "+504 2235-0184 / +504 2235-0185" },
                  { icon: Mail, label: "Correo", value: "contacto@fenah.hn / competencias@fenah.hn" },
                  { icon: Globe, label: "Web", value: "www.fenah.hn" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="text-white/80 text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-10">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Redes Sociales</div>
                <div className="flex gap-3">
                  {["Facebook", "Instagram", "YouTube", "Twitter/X"].map((s) => (
                    <button
                      key={s}
                      className="px-3 py-2 border border-white/10 rounded text-xs text-white/50 hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-card rounded-xl border border-white/10 p-8">
              <h3
                className="text-2xl font-black text-white uppercase mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Enviar Mensaje
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Nombre</label>
                  <input
                    type="text"
                    className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Correo</label>
                  <input
                    type="email"
                    className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Asunto</label>
                  <div className="relative">
                    <select className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer">
                      <option>Afiliación de nadador</option>
                      <option>Registro de club</option>
                      <option>Información sobre competencias</option>
                      <option>Patrocinio</option>
                      <option>Prensa y comunicaciones</option>
                      <option>Otro</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Mensaje</label>
                  <textarea
                    rows={4}
                    className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors resize-none placeholder-white/20"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-accent text-[#061529] font-black text-lg rounded hover:bg-white transition-all duration-200 tracking-widest uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#030d1a] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#061529" />
                    <path d="M8 22 Q14 16 20 22 Q26 28 32 22" stroke="#00C8E0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M8 18 Q14 12 20 18 Q26 24 32 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <circle cx="20" cy="13" r="3" fill="#00C8E0" />
                  </svg>
                </div>
                <div>
                  <div
                    className="text-white font-bold text-base leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                  >
                    FEHNA
                  </div>
                  <div className="text-accent text-xs leading-none mt-0.5">Federación Hondureña de Natación</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Organismo rector de la natación, clavados, waterpolo y nado sincronizado en Honduras. Miembro oficial de FINA y la UANA.
              </p>
            </div>

            <div>
              <div
                className="text-white font-bold text-sm uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Disciplinas
              </div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {["Natación", "Clavados", "Waterpolo", "Nado Sincronizado", "Aguas Abiertas"].map((d) => (
                  <li key={d} className="hover:text-accent cursor-pointer transition-colors">{d}</li>
                ))}
              </ul>
            </div>

            <div>
              <div
                className="text-white font-bold text-sm uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Institución
              </div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {["Quiénes Somos", "Junta Directiva", "Reglamentos", "Resultados Oficiales", "Estatutos", "Transparencia"].map((l) => (
                  <li key={l} className="hover:text-accent cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs">
              © 2025 Federación Hondureña de Natación · Todos los derechos reservados
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground items-center">
              <span className="hover:text-accent cursor-pointer transition-colors">Política de Privacidad</span>
              <span className="hover:text-accent cursor-pointer transition-colors">Términos de Uso</span>
              <span className="hover:text-accent cursor-pointer transition-colors">Mapa del Sitio</span>
              <AdminLink />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
