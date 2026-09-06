"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Roughly the depth of a page hero — the button holds back until the
   visitor has committed to reading, then stays for the rest of the page. */
const REVEAL_AFTER = 400;

/**
 * The site's one "download this PDF" affordance: a pill that parks itself in
 * the bottom-right corner of the viewport once you scroll past the hero.
 *
 * Render it at page level, as a sibling of <main> rather than inside it, so
 * it is fixed against the viewport and not against a scrolling ancestor.
 * Only render it where a catalogue actually exists — there is deliberately
 * no default `catalogueUrl`, so a page without one cannot offer the wrong PDF.
 */
export default function FloatingCatalogueButton({
  catalogueUrl,
  label = "Download Catalogue",
}: {
  /** Path under /public/catalogues. */
  catalogueUrl: string;
  label?: string;
}) {
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sync = () => {
      /* A page too short to scroll that far would never reveal the button,
         so on those it is shown straight away. */
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight > REVEAL_AFTER;
      if (!scrollable || window.scrollY > REVEAL_AFTER) setShown(true);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
    /* Never set back to false: once revealed it stays for the rest of the
       page, so it does not flicker on the way back up. */
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : 14 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
          /* Below the navbar (z-50) and the mobile menu (z-60) so those
             still cover it, but above everything in the page body. Bottom
             offset clears the iOS home indicator. */
          className="fixed right-4 z-40 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <a
            href={catalogueUrl}
            /* `download` is what makes the browser save the file instead of
               navigating away from the page. Plain <a> — these are static
               assets in /public, not app routes. */
            download=""
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-amber-400 px-4 py-2.5 text-xs font-semibold text-ink shadow-[0_16px_44px_-12px_rgba(245,148,31,0.75),0_4px_16px_-4px_rgba(6,10,20,0.6)] ring-1 ring-ink-deep/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_-12px_rgba(245,148,31,0.95),0_4px_16px_-4px_rgba(6,10,20,0.6)] sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-sm"
          >
            <Download
              size={15}
              strokeWidth={2.2}
              className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5 sm:size-4"
            />
            {label}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
