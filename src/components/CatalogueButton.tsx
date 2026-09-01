import { Download } from "lucide-react";

/* Downloads the PDF rather than navigating to it: the `download` attribute
   tells the browser to save the file, so the visitor never loses the page.
   Plain <a> — the files are static assets in /public, not app routes. */
export default function CatalogueButton({
  href,
  label = "View Catalogue",
  className = "",
}: {
  /** Path under /public/catalogues. */
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      download=""
      className={
        "group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber to-amber-400 px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_14px_40px_-12px_rgba(245,148,31,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-12px_rgba(245,148,31,0.9)] " +
        className
      }
    >
      <Download
        size={16}
        strokeWidth={2.2}
        className="transition-transform duration-300 group-hover:translate-y-0.5"
      />
      {label}
    </a>
  );
}
