import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "記事をタグから探す",
  alternates: { canonical: "/tags" },
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Tags
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        タグから記事を探せます。
      </p>

      {tags.length === 0 ? (
        <p className="mt-8 text-slate-500 dark:text-slate-400">
          まだタグが登録された記事がありません。
        </p>
      ) : (
        <div className="mt-8 flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-md dark:border-violet-800 dark:bg-slate-900 dark:text-violet-300"
            >
              #{tag}
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs text-violet-600 dark:bg-violet-900 dark:text-violet-300">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
