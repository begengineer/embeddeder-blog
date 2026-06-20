import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import { AffiliateLink } from "@/components/affiliate-link";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

const mdxComponents = {
  AffiliateLink,
};

export function renderMdx(content: string) {
  return (
    <MDXRemote
      source={content}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              { behavior: "wrap", properties: { className: "no-underline" } },
            ],
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
