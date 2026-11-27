import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Geist, Geist_Mono } from "next/font/google";
import { profile } from "./data";
import { themeInitScript } from "./themes";
import "./globals.css";

// Polices des trois directions artistiques. Seule la DA par défaut (Geist) est préchargée.
// Les polices japonaises passent par Google Fonts (voir <head>) : leur découpage par unicode-range
// télécharge seulement les glyphes affichés, et next/font ne sait pas les auto-héberger avec Turbopack.
const JP_FONTS =
  "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap";
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  preload: false,
});
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

const fontVars = [geist, geistMono, bricolage, dmMono].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: profile.intro,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-da / data-mode sont posés par le script avant hydratation : on ignore l'écart attendu.
    <html
      lang="fr"
      className={fontVars}
      data-da="sobre"
      data-mode="system"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={JP_FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
