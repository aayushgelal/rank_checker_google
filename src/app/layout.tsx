import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { RankListProvider } from "@/Providers/RankList";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <RankListProvider>{children}</RankListProvider></body>
    </html>
  );
}
