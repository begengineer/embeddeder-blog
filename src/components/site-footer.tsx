import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-sm text-neutral-500 sm:flex-row sm:justify-between dark:text-neutral-400">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.author}
        </p>
        <p>{siteConfig.description}</p>
      </div>
    </footer>
  );
}
