import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  emoji?: string;
  draft?: boolean;
};

const DEFAULT_EMOJI = "📝";

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

function getSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    emoji: frontmatter.emoji ?? DEFAULT_EMOJI,
    slug,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    content,
  };
}

const includeDrafts = process.env.NODE_ENV !== "production";

export function getAllPosts(): Post[] {
  return getSlugs()
    .map(readPost)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostMetas(): PostMeta[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
    emoji: post.emoji,
    draft: post.draft,
    readingMinutes: post.readingMinutes,
  }));
}

export function getPostBySlug(slug: string): Post | undefined {
  if (!getSlugs().includes(slug)) return undefined;
  const post = readPost(slug);
  if (post.draft && !includeDrafts) return undefined;
  return post;
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostMetas().filter((post) => post.tags.includes(tag));
}
