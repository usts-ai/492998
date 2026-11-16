import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../data/mock";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-[#F5F5F5]/92 backdrop-blur-md shadow-[0_1px_0_rgba(26,58,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="font-[Cormorant_Garamond] text-2xl tracking-[0.18em] text-[#1A3A2A] transition-opacity hover:opacity-70 md:text-[1.65rem]"
          onClick={() => setOpen(false)}
        >
          MEMORIA
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-[Manrope] text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#1A3A2A]/75"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#5B8A72] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#carte"
            className="font-[Manrope] rounded-sm bg-[#1A3A2A] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#F5F5F5] transition-all duration-300 hover:bg-[#2D5A42] hover:tracking-[0.2em]"
          >
            Essayer la carte
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-6 bg-[#1A3A2A]"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[1.5px] w-6 bg-[#1A3A2A]"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-6 bg-[#1A3A2A]"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full border-t border-[#1A3A2A]/10 bg-[#F5F5F5] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setOpen(false)}
                  className="font-[Cormorant_Garamond] border-b border-[#1A3A2A]/08 py-4 text-3xl text-[#1A3A2A]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#carte"
                onClick={() => setOpen(false)}
                className="mt-4 bg-[#1A3A2A] py-3.5 text-center font-[Manrope] text-xs font-semibold uppercase tracking-[0.18em] text-[#F5F5F5]"
              >
                Essayer la carte
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
