import type { Metadata } from "next";
import { Inter, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const calgary = Mrs_Saint_Delafield({
  variable: "--font-calgary",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Buying 101 | Free Webinar | ZACKT Real Estate Group",
  description:
    "Join Tim Lambert and Dustin Sullins for a free webinar walking you through the home buying process, from pre-approval to closing table. January 29th, 6-7 PM CT.",
  keywords: [
    "home buying",
    "real estate webinar",
    "first time home buyer",
    "mortgage",
    "pre-approval",
    "Springfield MO real estate",
  ],
  openGraph: {
    title: "Home Buying 101 | Free Webinar",
    description:
      "Your complete guide from pre-approval to closing table. Join us January 29th!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${calgary.variable} antialiased`}>{children}</body>
    </html>
  );
}
