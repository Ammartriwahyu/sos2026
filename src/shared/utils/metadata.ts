import type { Metadata } from "next";
import SOSLOGO from "@/assets/logo-sos.svg";
import logoPng from "@/assets/logo-sos.png";
export const siteConfig = {
  name: "Synergy of Symphony 2026",
  shortName: "SOS 2026",
  description:
    "Ajang pembekalan awal bagi mahasiswa baru Departemen Sistem Informasi 2026 yang menumbuhkan kolaborasi dan kepemimpinan, diwujudkan melalui Shaping The Future",
  url: "https://sos.kbmdsi.com/",
  ogImage: SOSLOGO,
  twitterImage: SOSLOGO,
  themeColor: "#1e40af",
  logoPng: logoPng,
};

export const defaultMetadata: Metadata = {
  title: {
    default: "Synergy of Symphony ",
    template: "%s | SOS 2026",
  },
  description:
    "Ajang pembekalan awal bagi mahasiswa baru Departemen Sistem Informasi 2026. Siap memulai perjalanan barumu? Temukan detailnya di sini.",
  icons: {
    icon: [
      {
        url: logoPng.src,
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: logoPng.src,
        type: "image/png",
      },
    ],
    apple: [
      {
        url: logoPng.src,
        type: "image/png",
      },
    ],
  },
  keywords: [
    "SOS 2026",
    "sos",
    "synergy of symphony",
    "synergy of symphony 2026",
    "KBMDSI",
    "pembekalan mahasiswa baru",
    "mahasiswa baru sistem informasi",
    "departemen sistem informasi",
    "shaping the future",
    "kolaborasi mahasiswa",
    "kepemimpinan mahasiswa",
    "orientasi mahasiswa baru",
    "sistem informasi 2026",
  ],

  authors: [{ name: "Panitia SOS 2026" }],
  creator: "Departemen Sistem Informasi",
  publisher: "KBMDSI",
  generator: "Next.js",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  other: {
    "theme-color": siteConfig.themeColor,
    "color-scheme": "light dark",
    "event-year": "2026",
    "event-type": "KBMDSI",
    "target-audience": "mahasiswa baru sistem informasi",
  },
};

export const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Synergy of Symphony 2026 (SOS 2026)",
  description:
    "Ajang pembekalan awal bagi mahasiswa baru Departemen Sistem Informasi 2026 yang menumbuhkan kolaborasi dan kepemimpinan, diwujudkan melalui Shaping The Future",
  location: {
    "@type": "Place",
    name: "Departemen Sistem Informasi",
  },
  organizer: {
    "@type": "Organization",
    name: "Keluarga Besar Departemen Sistem Informasi",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Mahasiswa Baru Sistem Informasi 2026",
  },
  keywords:
    "SOS, KBMDSI, synergy of symphony, mahasiswa baru, sistem informasi",
  inLanguage: "id-ID",
};
