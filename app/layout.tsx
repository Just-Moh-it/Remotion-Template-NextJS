import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "%s | Remotion NextJS Template",
  description:
    "A starter template to create videos programatically with Remotion, NextJS and TailwindCSS",
  // Author
  author: {
    name: "Mohit Yadav",
    twitter: "Just_Moh_it",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
