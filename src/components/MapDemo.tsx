import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sepultures } from "../data/mock";

const MapDemo: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(sepultures[0].id);
  const [guided, setGuided] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sepultures;
    return sepultures.filter(
      (s) =>
        s.nom.toLowerCase().includes(q) ||
        s.allee.toLowerCase().includes(q) ||
        s.parcelle.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  }, [query]);

  const active = sepultures.find((s) => s.id === activeId) ?? null;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1A3A2A]/10 bg-white shadow-[0_20px_60px_-30px_rgba(26,58,42,0.35)]">
      <div className="flex flex-col gap-3 border-b border-[#1A3A2A]/08 bg-[#F5F5F5] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une sépulture, une allée…"
            className="w-full rounded-lg border border-[#1A3A2A]/12 bg-white px-4 py-3 font-[Manrope] text-sm text-[#1A3A2A] outline-none transition focus:border-[#5B8A72] focus:ring-2 focus:ring-[#98FF98]/40"
          />
        </div>
        <button
          type="button"
          onClick={() => setGuided((g) => !g)}
          className={`rounded-lg px-4 py-3 font-[Manrope] text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
            guided
              ? "bg-[#5B8A72] text-white"
              : "bg-[#1A3A2A] text-[#F5F5F5] hover:bg-[#2D5A42]"
          }`}
        >
          {guided ? "Guidage actif" : "Lancer le guidage"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_0.9fr]">
        <div className="relative min-h-[320px] bg-[#E8F0EC] sm:min-h-[420px]">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(26,58,42,0.04) 1px, transparent 1px),
                linear-gradient(rgba(26,58,42,0.04) 1px, transparent 1px),
                radial-gradient(ellipse at 30% 20%, #ADD8E6 0%, transparent 50%),
                radial-gradient(ellipse at 80% 70%, #98FF98 0%, transparent 45%),
                linear-gradient(160deg, #E6E6FA 0%, #E8F0EC 40%, #ADD8E6 100%)
              `,
              backgroundSize: "40px 40px, 40px 40px, auto, auto, auto",
            }}
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M10,80 C25,60 35,70 50,45 C60,30 70,35 90,20"
              fill="none"
              stroke="#5B8A72"
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
            <path
              d="M5,40 C30,42 40,55 55,50 C75,42 80,65 95,70"
              fill="none"
              stroke="#1A3A2A"
              strokeWidth="0.4"
              opacity="0.5"
            />
          </svg>

          {guided && active && (
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0"
            >
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d={`M12,88 Q ${active.x * 0.5},${(active.y + 88) / 2} ${active.x},${active.y}`}
                  fill="none"
                  stroke="#1A3A2A"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
              <motion.div
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A3A2A] shadow-lg"
                initial={{ left: "12%", top: "88%" }}
                animate={{ left: `${active.x}%`, top: `${active.y}%` }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </motion.div>
          )}

          {filtered.map((s) => {
            const isActive = s.id === activeId;
            return (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveId(s.id);
                  setGuided(false);
                }}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: isActive ? [0, -6, 0] : 0 }}
                transition={
                  isActive
                    ? { y: { repeat: Infinity, duration: 1.6, ease: "easeInOut" } }
                    : { duration: 0.2 }
                }
              >
                <span
                  className={`block h-4 w-4 rotate-45 border-2 border-white shadow-md ${
                    isActive ? "bg-[#1A3A2A]" : "bg-[#5B8A72]"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 font-[Manrope] text-[10px] ${
                    isActive
                      ? "bg-[#1A3A2A] text-white"
                      : "bg-white/90 text-[#1A3A2A]"
                  }`}
                >
                  {s.parcelle}
                </span>
              </motion.button>
            );
          })}

          <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-2 font-[Manrope] text-[10px] uppercase tracking-[0.14em] text-[#1A3A2A]/70 backdrop-blur">
            Cimetière communal · Saint-Laurent
          </div>
        </div>

        <div className="border-t border-[#1A3A2A]/08 bg-white p-5 lg:border-l lg:border-t-0">
          <p className="font-[Manrope] text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#5B8A72]">
            Fiche sépulture
          </p>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mt-4"
              >
                <h3 className="font-[Cormorant_Garamond] text-3xl text-[#1A3A2A] md:text-4xl">
                  {active.nom}
                </h3>
                <p className="mt-1 font-[Manrope] text-sm text-[#1A3A2A]/55">
                  {active.dates}
                </p>
                <dl className="mt-6 space-y-3 font-[Manrope] text-sm">
                  <div className="flex justify-between border-b border-[#1A3A2A]/08 pb-2">
                    <dt className="text-[#1A3A2A]/5">Référence</dt>
                    <dd className="font-medium text-[#1A3A2A]">{active.id}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#1A3A2A]/08 pb-2">
                    <dt className="text-[#1A3A2A]/5">Allée</dt>
                    <dd className="font-medium text-[#1A3A2A]">{active.allee}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#1A3A2A]/08 pb-2">
                    <dt className="text-[#1A3A2A]/5">Parcelle</dt>
                    <dd className="font-medium text-[#1A3A2A]">{active.parcelle}</dd>
                  </div>
                  <div className="flex justify-between pb-2">
                    <dt className="text-[#1A3A2A]/5">Commune</dt>
                    <dd className="font-medium text-[#1A3A2A]">{active.commune}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setGuided(true)}
                    className="flex-1 bg-[#1A3A2A] py-3 font-[Manrope] text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#2D5A42]"
                  >
                    Guidage GPS
                  </button>
                  <button
                    type="button"
                    className="flex-1 border border-[#1A3A2A]/2 py-3 font-[Manrope] text-xs font-semibold uppercase tracking-[0.12em] text-[#1A3A2A] transition hover:border-[#5B8A72] hover:bg-[#E8F0EC]"
                  >
                    QR code
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 font-[Manrope] text-sm text-[#1A3A2A]/5"
              >
                Aucune sépulture ne correspond à votre recherche.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <p className="mb-3 font-[Manrope] text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#5B8A72]">
              Résultats ({filtered.length})
            </p>
            <ul className="max-h-40 space-y-2 overflow-y-auto pr-1">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(s.id);
                      setGuided(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left transition ${
                      s.id === activeId
                        ? "bg-[#E8F0EC]"
                        : "hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <span className="block font-[Manrope] text-sm font-medium text-[#1A3A2A]">
                      {s.nom}
                    </span>
                    <span className="font-[Manrope] text-xs text-[#1A3A2A]/5">
                      {s.allee} · {s.parcelle}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDemo;
