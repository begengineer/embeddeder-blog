import type { MetadataRoute } from "next";
import { getAllPostMetas, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMetas();
  const tags = getAllTags();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/tags`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag)}`,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
