import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import { renderMdx } from "@/lib/mdx";
import { formatDate } from "@/lib/format";
import { TagPill } from "@/components/tag-pill";
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
    <article className="mx-auto max-w-5xl px-6 py-16">
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
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} 分で読了</span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      {adsenseEnabled && (
        <div className="mx-auto mb-8 max-w-3xl">
          <AdDisclosure />
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div>
          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:rounded-xl prose-a:text-violet-600 dark:prose-a:text-violet-400">
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
