import type { ReactNode } from "react";

type AffiliateLinkProps = {
  href: string;
  children: ReactNode;
};

/**
 * アフィリエイトリンク。rel=sponsored を付与し、クローラー/読者の双方に広告であることを示す。
 */
export function AffiliateLink({ href, children }: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="font-medium text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-700 dark:text-violet-400 dark:decoration-violet-700"
    >
      {children}
    </a>
  );
}
