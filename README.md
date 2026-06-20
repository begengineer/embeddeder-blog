# embeddeder

Next.js (App Router) + MDX で構築した個人技術ブログです。

## 技術スタック

- Next.js 16 (App Router, 静的書き出し `output: "export"`)
- TypeScript / Tailwind CSS v4
- MDX (`next-mdx-remote/rsc`) によるブログ記事管理（`content/posts/*.mdx`）
- シンタックスハイライト（Shiki / `rehype-pretty-code`）
- 記事内目次の自動生成
- タグ別一覧ページ
- RSSフィード（`/rss.xml`）
- サイトマップ・robots.txt 自動生成
- JSON-LD 構造化データ（WebSite / BlogPosting）
- ダークモード対応（`next-themes`）

> **Note:** `next dev` / `next build` は `--webpack` フラグ付きで実行しています。
> Turbopack はパス中に日本語ディレクトリ（例: `デスクトップ`）が含まれる環境でクラッシュする既知の不具合があるため、Webpack ビルドに固定しています。

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 記事の追加方法

`content/posts/` 配下に `.mdx` ファイルを追加します。

```mdx
---
title: "記事タイトル"
date: "2026-06-21"
description: "記事の説明文（OGP・RSS・SEOに使用されます）"
tags: ["タグ1", "タグ2"]
---

本文をMarkdown/MDXで記述します。
```

`draft: true` を frontmatter に追加すると、本番ビルド (`NODE_ENV=production`) では非表示になります。

## サイト基本情報の変更

`src/config/site.ts` を編集してください。

```ts
export const siteConfig = {
  title: "embeddeder",
  description: "...",
  author: "Blog Author",
  url: "https://example.com", // 本番ドメインに変更してください
  ...
};
```

`url` は OGP・サイトマップ・RSS・canonical URL の生成に使われるため、独自ドメインを取得したら必ず更新してください。

## ビルド

```bash
npm run build
```

静的ファイルが `out/` に出力されます。ローカルで確認する場合:

```bash
npm run serve
```

## Cloudflare Pages へのデプロイ

このサイトは完全に静的なページ（全ルートが Static / SSG）として出力されるため、
Cloudflare Pages の「静的サイト」としてそのままデプロイできます。

### 方法A: Cloudflareダッシュボード + Git連携（推奨）

1. このリポジトリを GitHub に push する
2. Cloudflare ダッシュボード → Workers & Pages → Create → Pages → リポジトリを接続
3. ビルド設定:
   - Build command: `npm run build`
   - Build output directory: `out`
4. 保存してデプロイ。以降は `git push` のたびに自動デプロイされます

### 方法B: Wrangler CLI から直接デプロイ

```bash
npm run cf:deploy
```

初回はCloudflareアカウントへのログイン（`npx wrangler login`）が必要です。
プロジェクト名は `package.json` の `cf:deploy` スクリプト内 `--project-name` で変更できます。

### 独自ドメインの設定

Cloudflare Pages のプロジェクト設定からカスタムドメインを追加し、
`src/config/site.ts` の `url` を実際のドメインに更新後、再デプロイしてください。

## SEO

- `src/app/sitemap.ts` / `src/app/robots.ts` で sitemap.xml / robots.txt を自動生成
- 各ページに canonical URL・OGP・Twitter Card メタデータを設定済み
- 記事ページには `BlogPosting` の JSON-LD、トップページには `WebSite` の JSON-LD を出力
- Google Search Console へ登録する場合は、`src/app/layout.tsx` の `metadata` に
  `verification: { google: "..." }` を追加してください

## 収益化

### Google AdSense

1. `.env.example` を `.env.local` にコピーし、AdSenseの審査通過後に発行される
   クライアントID・広告ユニットスロットIDを設定する

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
   NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE=xxxxxxxxxx
   NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=xxxxxxxxxx
   ```

2. Cloudflare Pages にデプロイする場合は、プロジェクト設定の
   Environment Variables にも同じ値を追加してビルドし直す
3. 未設定の状態では広告スクリプト・広告枠・広告開示文は一切描画されません
   （審査前や開発時にレイアウトが崩れないようにするための挙動です）
4. `/ads.txt` は `NEXT_PUBLIC_ADSENSE_CLIENT_ID` から自動生成されます

広告の配置は `src/app/posts/[slug]/page.tsx` で記事下部・サイドバーに
`AdSlot` コンポーネントとして組み込み済みです。配置を変えたい場合はこのファイルを編集してください。

### アフィリエイト

`src/components/affiliate-link.tsx` を使うと `rel="sponsored"` 付きのリンクを
記事内（MDX）からタグとしてそのまま利用できます（`src/lib/mdx.tsx` で登録済みのため import は不要です）。

```mdx
<AffiliateLink href="https://example.com/product">商品名</AffiliateLink>
```

景品表示法のステマ規制に対応するため、広告を含む記事には
`src/components/ad-disclosure.tsx`（開示文）を表示する運用を推奨します。
AdSense有効時は記事ページに自動で表示されます。
