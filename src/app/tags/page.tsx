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
    <section className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Tags
      </h1>

      {tags.length === 0 ? (
        <p className="mt-8 text-neutral-500 dark:text-neutral-400">
          まだタグが登録された記事がありません。
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="flex items-center justify-between py-3 text-sm text-neutral-700 hover:text-neutral-900 hover:underline dark:text-neutral-300 dark:hover:text-white"
              >
                <span>#{tag}</span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
