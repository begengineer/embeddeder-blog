import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${decodeURIComponent(tag)}`,
    description: `「${decodeURIComponent(tag)}」タグが付いた記事の一覧`,
    alternates: { canonical: `/tags/${tag}` },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) notFound();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
        Tag
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        #{decodedTag}
      </h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
