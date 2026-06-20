"use client";

import { useEffect, useRef } from "react";
import { adsenseEnabled, monetizationConfig } from "@/config/monetization";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  slot: string;
  label?: string;
  className?: string;
};

/**
 * AdSense広告枠。NEXT_PUBLIC_ADSENSE_CLIENT_ID / slot が未設定の場合は何も描画しない。
 */
export function AdSlot({ slot, label = "広告", className }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsenseEnabled || !slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSenseスクリプト未読み込み時は無視する
    }
  }, [slot]);

  if (!adsenseEnabled || !slot) return null;

  return (
    <div className={className}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={monetizationConfig.adsenseClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
