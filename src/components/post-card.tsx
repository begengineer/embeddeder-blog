import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagPill } from "@/components/tag-pill";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-200/50 dark:border-white/10 dark:bg-slate-900 dark:hover:shadow-violet-900/30">
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition group-hover:scale-x-100" />
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} 分で読了</span>
      </div>

      <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        <Link
          href={`/posts/${post.slug}`}
          className="after:absolute after:inset-0"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
