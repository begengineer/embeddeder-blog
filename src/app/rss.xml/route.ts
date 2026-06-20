import { Feed } from "feed";
import { getAllPostMetas } from "@/lib/posts";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPostMetas();

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.language,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.author}`,
    author: { name: siteConfig.author },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/posts/${post.slug}`,
      link: `${siteConfig.url}/posts/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: siteConfig.author }],
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
