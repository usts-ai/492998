import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapDemo from "../components/MapDemo";
import { chiffres, etapes, offres } from "../data/mock";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const parcoursRef = useRef<HTMLElement>(null);
  const parcoursInView = useInView(parcoursRef, { once: true, amount: 0.2 });

  return (
    <div id="top" className="min-h-screen bg-[#F5F5F5] text-[#1A3A2A]">
      <Header />

      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-end overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80"
            alt="Allée arborée baignée de lumière"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/55 to-[#1A3A2A]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F5]/70 via-transparent to-[#ADD8E6]/20" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: titleY }}
          className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pb-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[Cormorant_Garamond] text-[clamp(3.2rem,12vw,8.5rem)] leading-[0.9] tracking-[0.12em] text-[#1A3A2A]"
          >
            MEMORIA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-5 max-w-xl font-[Manrope] text-lg font-medium leading-snug text-[#1A3A2A]/85 md:text-2xl"
          >
            Retrouvez chaque sépulture en un scan.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-3 max-w-md font-[Manrope] text-sm leading-relaxed text-[#1A3A2A]/65 md:text-base"
          >
            Cartographie et guidage GPS pour les communes — une expérience
            respectueuse, fluide et accessible à tous.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#carte"
              className="bg-[#1A3A2A] px-7 py-3.5 text-center font-[Manrope] text-xs font-semibold uppercase tracking-[0.16em] text-[#F5F5F5] transition-all duration-300 hover:bg-[#2D5A42] hover:tracking-[0.22em]"
            >
              Explorer la carte
            </a>
            <a
              href="#parcours"
              className="border border-[#1A3A2A]/25 px-7 py-3.5 text-center font-[Manrope] text-xs font-semibold uppercase tracking-[0.16em] text-[#1A3A2A] transition-all duration-300 hover:border-[#5B8A72] hover:bg-white/60"
            >
              Voir le parcours
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 right-5 hidden font-[Manrope] text-[0.65rem] uppercase tracking-[0.2em] text-[#1A3A2A]/45 md:block"
        >
          Faire défiler
        </motion.div>
      </section>

      <section id="decouvrir" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <p className="font-[Manrope] text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#5B8A72]">
                Pour les communes
              </p>
              <h2 className="mt-3 font-[Cormorant_Garamond] text-4xl leading-tight text-[#1A3A2A] md:text-5xl lg:text-6xl">
                La mémoire, enfin facile à retrouver.
              </h2>
              <p className="mt-5 font-[Manrope] text-base leading-relaxed text-[#1A3A2A]/65 md:text-lg">
                Memoria transforme chaque sépulture en point cartographié
                accessible via QR code. Visiteurs, agents de terrain et
                administrateurs partagent un même fil numérique, clair et digne.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80"
                  alt="Espace mémoriel paisible"
                  className="h-[280px] w-full object-cover sm:h-[360px] md:h-[420px]"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-5 left-4 right-4 rounded-xl border border-white/60 bg-[#F5F5F5]/95 p-4 shadow-lg backdrop-blur sm:left-auto sm:right-[-1rem] sm:w-56"
              >
                <p className="font-[Manrope] text-[0.65rem] uppercase tracking-[0.16em] text-[#5B8A72]">
                  Accès immédiat
                </p>
                <p className="mt-1 font-[Cormorant_Garamond] text-2xl text-[#1A3A2A]">
                  Scan → Fiche → Guidage
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-4 md:mt-28 md:grid-cols-4 md:gap-6">
            {chiffres.map((c, i) => (
              <motion.div
                key={c.label}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border-t border-[#1A3A2A]/15 pt-5"
              >
                <p className="font-[Cormorant_Garamond] text-3xl text-[#1A3A2A] md:text-4xl">
                  {c.valeur}
                </p>
                <p className="mt-1 font-[Manrope] text-xs uppercase tracking-[0.14em] text-[#1A3A2A]/5">
                  {c.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="parcours"
        ref={parcoursRef}
        className="relative overflow-hidden bg-gradient-to-b from-[#E6E6FA]/50 via-[#F5F5F5] to-[#ADD8E6]/25 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={parcoursInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="font-[Manrope] text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#5B8A72]">
              Parcours visiteur
            </p>
            <h2 className="mt-3 font-[Cormorant_Garamond] text-4xl text-[#1A3A2A] md:text-5xl">
              Trois gestes. Une présence.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {etapes.map((etape, i) => (
              <motion.article
                key={etape.titre}
                initial={{ opacity: 0, y: 40 }}
                animate={parcoursInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.7 }}
                className="group"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={etape.image}
                    alt={etape.titre}
                    className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-56"
                  />
                </div>
                <p className="mt-5 font-[Cormorant_Garamond] text-5xl text-[#98FF98] drop-shadow-sm">
                  0{i + 1}
                </p>
                <h3 className="mt-1 font-[Cormorant_Garamond] text-2xl text-[#1A3A2A] md:text-3xl">
                  {etape.titre}
                </h3>
                <p className="mt-2 font-[Manrope] text-sm leading-relaxed text-[#1A3A2A]/65">
                  {etape.texte}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="carte" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 max-w-2xl md:mb-14"
          >
            <p className="font-[Manrope] text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#5B8A72]">
              Démo interactive
            </p>
            <h2 className="mt-3 font-[Cormorant_Garamond] text-4xl text-[#1A3A2A] md:text-5xl">
              La carte vivante du cimetière
            </h2>
            <p className="mt-4 font-[Manrope] text-sm leading-relaxed text-[#1A3A2A]/65 md:text-base">
              Recherchez une sépulture, ouvrez sa fiche et lancez le guidage —
              comme sur la PWA grand public.
            </p>
          </motion.div>
          <MapDemo />
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, #E8F0EC 0%, #F5F5F5 40%, #E6E6FA 100%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 max-w-xl"
          >
            <p className="font-[Manrope] text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#5B8A72]">
              Écosystème MVP
            </p>
            <h2 className="mt-3 font-[Cormorant_Garamond] text-4xl text-[#1A3A2A] md:text-5xl">
              Public, terrain, administration.
            </h2>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {offres.map((offre, i) => (
              <motion.article
                key={offre.titre}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col overflow-hidden rounded-2xl bg-white/70 shadow-[0_16px_50px_-28px_rgba(26,58,42,0.35)] backdrop-blur sm:flex-row ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="sm:w-2/5">
                  <img
                    src={offre.image}
                    alt={offre.titre}
                    className="h-48 w-full object-cover sm:h-full sm:min-h-[220px]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-10">
                  <p className="font-[Manrope] text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#5B8A72]">
                    Module {i + 1}
                  </p>
                  <h3 className="mt-2 font-[Cormorant_Garamond] text-3xl text-[#1A3A2A] md:text-4xl">
                    {offre.titre}
                  </h3>
                  <p className="mt-3 max-w-md font-[Manrope] text-sm leading-relaxed text-[#1A3A2A]/65 md:text-base">
                    {offre.texte}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="communes" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
              alt="Paysage verdoyant au lever du jour"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A2A]/88 via-[#1A3A2A]/72 to-[#ADD8E6]/45" />
            <div className="relative px-6 py-16 sm:px-12 md:px-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
                className="max-w-xl"
              >
                <p className="font-[Manrope] text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#98FF98]">
                  Déploiement communal
                </p>
                <h2 className="mt-4 font-[Cormorant_Garamond] text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                  Un MVP prêt en trois mois.
                </h2>
                <p className="mt-4 font-[Manrope] text-sm leading-relaxed text-white/75 md:text-base">
                  Collecte terrain, validation administrative, expérience
                  publique cartographiée — une chaîne complète, sécurisée et
                  conforme RGPD.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#carte"
                    className="bg-[#98FF98] px-7 py-3.5 text-center font-[Manrope] text-xs font-semibold uppercase tracking-[0.14em] text-[#1A3A2A] transition hover:bg-white"
                  >
                    Tester la démo
                  </a>
                  <a
                    href="#mentions"
                    className="border border-white/40 px-7 py-3.5 text-center font-[Manrope] text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
                  >
                    Demander un échange
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mentions"
        className="border-t border-[#1A3A2A]/08 bg-white/40 py-12"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-3" id="confidentialite">
            <div>
              <h3 className="font-[Cormorant_Garamond] text-2xl text-[#1A3A2A]">
                Mentions légales
              </h3>
              <p className="mt-2 font-[Manrope] text-sm leading-relaxed text-[#1A3A2A]/55">
                Prototype de démonstration visuelle sans backend. Aucune donnée
                personnelle n’est collectée ni stockée.
              </p>
            </div>
            <div id="rgpd">
              <h3 className="font-[Cormorant_Garamond] text-2xl text-[#1A3A2A]">
                Confidentialité & RGPD
              </h3>
              <p className="mt-2 font-[Manrope] text-sm leading-relaxed text-[#1A3A2A]/55">
                L’application cible respecte HTTPS, les rôles d’accès et les
                principes de minimisation des données.
              </p>
            </div>
            <div>
              <h3 className="font-[Cormorant_Garamond] text-2xl text-[#1A3A2A]">
                Flux de travail
              </h3>
              <p className="mt-2 font-[Manrope] text-sm leading-relaxed text-[#1A3A2A]/55">
                Terrain → API → validation admin → consultation publique et
                guidage GPS jusqu’à la sépulture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
