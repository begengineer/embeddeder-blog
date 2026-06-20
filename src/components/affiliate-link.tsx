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
      className="font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-900 dark:text-white dark:decoration-neutral-600 dark:hover:decoration-white"
    >
      {children}
    </a>
  );
}
