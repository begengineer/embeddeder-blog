import GithubSlugger from "github-slugger";

export type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export function extractToc(markdown: string): TocItem[] {
  const withoutCodeFences = markdown.replace(/```[\s\S]*?```/g, "");
  const lines = withoutCodeFences.split("\n");
  const toc: TocItem[] = [];
  const slugger = new GithubSlugger();

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugger.slug(text);
    toc.push({ id, text, depth });
  }

  return toc;
}
