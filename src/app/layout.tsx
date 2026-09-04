import type { Metadata } from "next";
import "@/styles/globals.css";
import { upanddownNormal, poppins } from "@/shared/utils/font";
import { defaultMetadata } from "@/shared/utils/metadata";
import SOSLOGO from "@/assets/logo-sos.png";

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL("https://sos.kbmdsi.com"),
  icons: {
    icon: SOSLOGO.src,
    shortcut: SOSLOGO.src,
    apple: SOSLOGO.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/png" href={SOSLOGO.src} />
        <link rel="shortcut icon" type="image/png" href={SOSLOGO.src} />
        <link rel="apple-touch-icon" href={SOSLOGO.src} />
      </head>
      <body
        className={`${poppins.variable} ${upanddownNormal.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
