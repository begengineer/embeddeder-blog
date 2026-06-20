import { getAllPostMetas } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getAllPostMetas();

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {siteConfig.description}
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-neutral-500 dark:text-neutral-400">
          まだ記事がありません。
        </p>
      ) : (
        <div className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
