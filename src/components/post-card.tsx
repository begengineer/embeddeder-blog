import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative flex items-start gap-4 py-5">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-xl dark:border-neutral-800 dark:bg-neutral-900"
      >
        {post.emoji}
      </span>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-bold text-neutral-900 group-hover:underline dark:text-white">
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {post.description}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 dark:text-neutral-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} 分で読了</span>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="relative z-10 hover:text-neutral-700 hover:underline dark:hover:text-neutral-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
