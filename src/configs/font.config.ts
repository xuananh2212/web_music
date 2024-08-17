import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin", "vietnamese", "latin-ext"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});
