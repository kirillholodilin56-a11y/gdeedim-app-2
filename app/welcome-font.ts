import localFont from "next/font/local";

/** SF Pro Rounded Heavy — welcome splash title only */
export const welcomeTitleFont = localFont({
  src: [
    {
      path: "./fonts/sf-pro-rounded-heavy.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-welcome-title",
  display: "swap",
});

/** Actay Wide Bold — welcome CTA button only */
export const welcomeCtaFont = localFont({
  src: [
    {
      path: "./fonts/ActayWide-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-welcome-cta",
  display: "swap",
});
