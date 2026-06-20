export const monetizationConfig = {
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "",
  adsenseSlotArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? "",
  adsenseSlotSidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "",
} as const;

export const adsenseEnabled = Boolean(monetizationConfig.adsenseClientId);
