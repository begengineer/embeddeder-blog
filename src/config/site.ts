export const siteConfig = {
  title: "embeddeder",
  description: "組み込み・ソフトウェアエンジニアの技術ブログ",
  author: "Blog Author",
  url: "https://example.com",
  locale: "ja-JP",
  language: "ja",
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/tags", label: "Tags" },
    { href: "/about", label: "About" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
