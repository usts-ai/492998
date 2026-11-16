import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const links = [
    { label: "Mentions légales", href: "#mentions" },
    { label: "Confidentialité", href: "#confidentialite" },
    { label: "RGPD", href: "#rgpd" },
    { label: "Contact communes", href: "#communes" },
  ];

  const reseaux = [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#1A3A2A] text-[#E8F0EC]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, #ADD8E6 0%, transparent 45%), radial-gradient(ellipse at 90% 100%, #98FF98 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-[Cormorant_Garamond] text-4xl tracking-[0.2em] md:text-5xl"
            >
              MEMORIA
            </motion.p>
            <p className="mt-4 max-w-sm font-[Manrope] text-sm leading-relaxed text-[#E8F0EC]/75">
              Géolocalisation de sépultures par QR code — une solution
              respectueuse, moderne et conçue pour les communes.
            </p>
          </div>

          <div>
            <p className="font-[Manrope] text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#98FF98]">
              Navigation
            </p>
            <ul className="mt-4 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex font-[Manrope] text-sm text-[#E8F0EC]/8 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#ADD8E6] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-[Manrope] text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#98FF98]">
              Suivez-nous
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {reseaux.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    className="inline-block border border-[#E8F0EC]/25 px-4 py-2 font-[Manrope] text-xs uppercase tracking-[0.14em] text-[#E8F0EC]/85 transition-all duration-300 hover:border-[#ADD8E6] hover:bg-[#ADD8E6]/15 hover:text-white"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-[Manrope] text-xs leading-relaxed text-[#E8F0EC]/55">
              Données géospatiales sécurisées · HTTPS · Rôles & accès
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[#E8F0EC]/15 pt-6 sm:flex-row sm:items-center">
          <p className="font-[Manrope] text-xs text-[#E8F0EC]/5">
            © {new Date().getFullYear()} Memoria — Prototype visuel
          </p>
          <p className="font-[Manrope] text-xs text-[#E8F0EC]/45">
            Conçu pour les collectivités territoriales
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
