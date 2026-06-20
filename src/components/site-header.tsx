import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          {siteConfig.title}
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-4 text-sm font-medium text-neutral-600 sm:gap-6 dark:text-neutral-400">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-neutral-900 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/rss.xml"
                className="transition hover:text-neutral-900 dark:hover:text-white"
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
