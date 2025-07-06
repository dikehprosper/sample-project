import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { CrispProvider } from "@/components/crisp-provider";
import toast, {Toaster} from "react-hot-toast";
export const metadata: Metadata = {
  title: "ZENTRA",
  description: "send accros multiple chains",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={inter.className}
        style={{backgroundColor: "#0F172B", backgroundRepeat: "no-repeat"}}
      >


        <Toaster />
        {children}
      </body>
    </html>
  );
}
