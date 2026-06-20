import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-extrabold text-white shadow-md shadow-violet-500/30">
            {siteConfig.title.charAt(0).toUpperCase()}
          </span>
          {siteConfig.title}
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-6 dark:text-slate-300">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-violet-600 dark:hover:text-violet-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/rss.xml"
                className="transition hover:text-violet-600 dark:hover:text-violet-300"
              >
                RSS
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
