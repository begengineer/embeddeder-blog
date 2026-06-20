import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.title} について`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        About
      </h1>
      <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
        <p>
          {siteConfig.title} は{siteConfig.author}
          が運営する技術ブログです。組み込み開発・ソフトウェア設計に関する知見を発信しています。
        </p>
      </div>
    </section>
  );
}
