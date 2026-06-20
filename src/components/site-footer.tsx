import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/60 py-10 dark:border-white/10 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-sm text-slate-500 sm:flex-row sm:justify-between dark:text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.author}
        </p>
        <p>{siteConfig.description}</p>
      </div>
    </footer>
  );
}
