/**
 * 景品表示法のステマ規制対応。アフィリエイト/広告を含むページに表示する開示文。
 */
export function AdDisclosure() {
  return (
    <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
      本記事には広告・アフィリエイトリンクが含まれる場合があります。
    </p>
  );
}
