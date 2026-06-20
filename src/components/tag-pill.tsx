import Link from "next/link";

export function TagPill({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 transition hover:border-violet-400 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300 dark:hover:border-violet-600"
    >
      #{tag}
    </Link>
  );
}
