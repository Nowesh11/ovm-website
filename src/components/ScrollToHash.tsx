"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to the element named by the URL hash and flashes a highlight ring
 * on it.
 *
 * The App Router does not reliably restore a hash target on client-side
 * navigation, and the project cards this targets live inside a horizontally
 * scrolling rail that the browser's own anchor handling gets wrong — so the
 * scroll is driven here instead.
 *
 * Renders nothing; mount it once per page that owns hash targets.
 */
export default function ScrollToHash({
  /** How long the highlight ring stays on, in ms. Matches the CSS animation. */
  highlightMs = 1500,
}: {
  highlightMs?: number;
}) {
  const pathname = usePathname();

  useEffect(() => {
    let highlightTimer: ReturnType<typeof setTimeout> | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let target: Element | null = null;

    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
        /* The carousel scrolls horizontally, so centre it there too. */
        inline: "center",
      });

      target?.classList.remove("anchor-highlight");
      clearTimeout(highlightTimer);

      /* Restart the animation on a repeat visit to the same hash. */
      void (el as HTMLElement).offsetWidth;
      el.classList.add("anchor-highlight");
      target = el;
      highlightTimer = setTimeout(
        () => el.classList.remove("anchor-highlight"),
        highlightMs,
      );
    };

    /* On a fresh load the target may not be laid out yet — images and the
       scroll rail settle a frame or two late — so try again shortly after. */
    const run = () => {
      requestAnimationFrame(go);
      retryTimer = setTimeout(go, 350);
    };

    run();
    window.addEventListener("hashchange", run);

    return () => {
      window.removeEventListener("hashchange", run);
      clearTimeout(highlightTimer);
      clearTimeout(retryTimer);
      target?.classList.remove("anchor-highlight");
    };
    /* `pathname` re-runs this when arriving from another route. */
  }, [pathname, highlightMs]);

  return null;
}
