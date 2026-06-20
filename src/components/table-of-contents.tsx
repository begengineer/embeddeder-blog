import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="rounded-2xl border border-black/5 bg-white p-5 text-sm dark:border-white/10 dark:bg-slate-900"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
        目次
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "ml-3" : undefined}>
            <a
              href={`#${item.id}`}
              className="text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
