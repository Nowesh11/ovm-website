"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

import { technologyLinks } from "@/data/technologies";

/* Nav model — edit here to change the menu in both desktop and mobile.
   Routes are absolute so every entry also works from a sub-page, where a
   bare "#hash" would resolve against the wrong document. */
const LINKS = [
  { label: "Home", href: "/", children: null },
  { label: "OVM Technologies", href: "/#technologies", children: technologyLinks },
  { label: "About", href: "/about", children: null },
];

function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      aria-label="OVM Malaysia — home"
      onClick={onNavigate}
      className="group flex shrink-0 items-center"
    >
      {/* The source logo is a near-white JPEG, so it sits on a white plate
          and multiplies into it rather than showing a grey box on dark chrome. */}
      <span className="logo-plate flex items-center rounded-lg px-2.5 py-1.5 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-[1.03]">
        <Image
          src="/logo.jpeg"
          alt="OVM Malaysia"
          width={1600}
          height={500}
          preload
          className="h-7 w-auto sm:h-8"
        />
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock page scroll while the mobile panel is open. */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Escape closes whatever is open. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setTechOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 " +
          (scrolled
            ? "border-b border-line/80 bg-ink/85 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent")
        }
      >
        <nav className="shell flex h-20 items-center justify-between gap-6">
          <Logo />

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setTechOpen(true)}
                  onMouseLeave={() => setTechOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={techOpen}
                    aria-haspopup="true"
                    onClick={() => setTechOpen((v) => !v)}
                    className="group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                    <ChevronDown
                      size={15}
                      className={
                        "transition-transform duration-300 " +
                        (techOpen ? "rotate-180 text-amber" : "")
                      }
                    />
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-amber to-navy-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </button>

                  <AnimatePresence>
                    {techOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-line bg-surface/95 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setTechOpen(false)}
                              className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-white"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors duration-200 group-hover/item:bg-amber" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-amber to-navy-400 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ),
            )}

            <Link
              href="/contact"
              className="ml-3 rounded-full bg-gradient-to-r from-amber to-amber-400 px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(245,148,31,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(245,148,31,0.85)]"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/70 text-white backdrop-blur-md transition-colors duration-200 hover:border-amber/50 lg:hidden"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-60 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-ink-deep/80 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-line bg-surface"
            >
              <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-6">
                <Logo onNavigate={() => setMobileOpen(false)} />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-white transition-colors duration-200 hover:border-amber/50"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                    className="border-b border-line/70"
                  >
                    {link.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setMobileTechOpen((v) => !v)}
                          aria-expanded={mobileTechOpen}
                          className="flex w-full items-center justify-between py-3.5 font-display text-lg font-semibold text-white"
                        >
                          {link.label}
                          <ChevronDown
                            size={18}
                            className={
                              "text-muted transition-transform duration-300 " +
                              (mobileTechOpen ? "rotate-180 text-amber" : "")
                            }
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileTechOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pb-3 pl-3">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-lg py-2 text-sm text-muted transition-colors duration-200 hover:text-amber"
                                  >
                                    <span className="h-1 w-1 rounded-full bg-amber/70" />
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3.5 font-display text-lg font-semibold text-white transition-colors duration-200 hover:text-amber"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="pt-8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl bg-gradient-to-r from-amber to-amber-400 px-5 py-3.5 text-center text-sm font-semibold text-ink shadow-[0_14px_40px_-12px_rgba(245,148,31,0.7)]"
                  >
                    Get in touch
                  </Link>
                </motion.div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
