"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Globe, Mail, MapPin, Phone } from "lucide-react";

import { CONTACT, EMAIL_HREF } from "@/data/contact";
import { technologyLinks } from "@/data/technologies";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  /* Careers has no page of its own — it anchors to the Contact page's
     "Careers at OVM" block. */
  { label: "Careers", href: "/contact#careers" },
];

const TECHNOLOGY_LINKS = technologyLinks;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* Shared link style so every column hovers identically. */
const linkClass =
  "group/link inline-flex items-center gap-2.5 text-sm text-muted transition-colors duration-300 hover:text-amber";

const bullet =
  "h-1 w-1 shrink-0 rounded-full bg-line transition-colors duration-300 group-hover/link:bg-amber";

const socialClass =
  "flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/50 hover:text-amber hover:shadow-[0_12px_30px_-12px_rgba(245,148,31,0.55)]";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      {/* Gradient hairline along the very top edge */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-navy-400)_28%,var(--color-amber)_72%,transparent_100%)] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 -z-0 h-80 w-[36rem] rounded-full bg-navy/12 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="shell relative py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1 — brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label="OVM Malaysia — home" className="group inline-flex">
              <span className="logo-plate inline-flex items-center rounded-lg px-3 py-2 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-[1.03]">
                <Image src="/logo.jpeg" alt="OVM Malaysia" width={1600} height={500} className="h-8 w-auto" />
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              OVM Prestressing Technology (M) Sdn. Bhd. supplies post-tensioning,
              stay-cable, bearing and monitoring systems to Malaysia&rsquo;s bridge and
              infrastructure sector — backed by six decades of OVM engineering and R&amp;D.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="OVM Malaysia on LinkedIn"
                className={socialClass}
              >
                <LinkedInIcon />
              </a>
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="OVM global website"
                className={socialClass}
              >
                <Globe size={17} />
              </a>
            </div>
          </div>

          {/* Column 2 — company */}
          <nav aria-label="Company" className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    <span className={bullet} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — technologies */}
          <nav aria-label="Technologies" className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
              Technologies
            </h3>
            <ul className="mt-5 space-y-3.5">
              {TECHNOLOGY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    <span className={bullet} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — contact */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-amber" />
                <address className="text-sm not-italic leading-relaxed text-muted">
                  {CONTACT.address}
                </address>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-start gap-3 text-sm text-muted transition-colors duration-300 hover:text-amber"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-amber" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_HREF}
                  className="flex items-start gap-3 break-all text-sm text-muted transition-colors duration-300 hover:text-amber"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-amber" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-center text-xs leading-relaxed text-muted-dim sm:text-left">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> OVM
            Prestressing Technology (M) Sdn. Bhd. All rights reserved.
          </p>

          {/* A button, not an "#top" anchor — the homepage is the only page
              with a #top element, so the anchor was inert everywhere else. */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-xs font-medium text-muted-dim transition-colors duration-300 hover:text-amber"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-amber/50">
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
