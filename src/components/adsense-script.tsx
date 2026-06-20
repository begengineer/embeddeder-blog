import Script from "next/script";
import { adsenseEnabled, monetizationConfig } from "@/config/monetization";

export function AdsenseScript() {
  if (!adsenseEnabled) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${monetizationConfig.adsenseClientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
