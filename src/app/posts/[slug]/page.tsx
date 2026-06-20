import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import { renderMdx } from "@/lib/mdx";
import { formatDate } from "@/lib/format";
import Link from "next/link";
import { TableOfContents } from "@/components/table-of-contents";
import { JsonLd } from "@/components/json-ld";
import { AdSlot } from "@/components/ad-slot";
import { AdDisclosure } from "@/components/ad-disclosure";
import { siteConfig } from "@/config/site";
import { adsenseEnabled, monetizationConfig } from "@/config/monetization";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteConfig.author }],
    keywords: post.tags,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `${siteConfig.url}/posts/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Person", name: siteConfig.author },
          publisher: { "@type": "Organization", name: siteConfig.title },
          keywords: post.tags.join(", "),
          mainEntityOfPage: `${siteConfig.url}/posts/${post.slug}`,
        }}
      />
      <header className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-3xl dark:border-neutral-800 dark:bg-neutral-900"
        >
          {post.emoji}
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} 分で読了</span>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="hover:text-neutral-900 hover:underline dark:hover:text-white"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {adsenseEnabled && (
        <div className="mb-8">
          <AdDisclosure />
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:rounded-xl prose-a:text-neutral-900 dark:prose-a:text-white">
            {renderMdx(post.content)}
          </div>

          <AdSlot
            slot={monetizationConfig.adsenseSlotArticle}
            className="mt-10"
          />
        </div>

        {(toc.length > 0 || adsenseEnabled) && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={toc} />
              <AdSlot slot={monetizationConfig.adsenseSlotSidebar} />
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
