import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="rounded-xl border border-neutral-200 p-5 text-sm dark:border-neutral-800"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        目次
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "ml-3" : undefined}>
            <a
              href={`#${item.id}`}
              className="text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
