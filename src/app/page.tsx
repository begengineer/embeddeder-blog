import { getAllPostMetas } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getAllPostMetas();

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          Tech Blog
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          {siteConfig.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
          {siteConfig.description}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400">
            まだ記事がありません。
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
