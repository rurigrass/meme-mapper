import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/auth/Providers";
import Navbar from "@/components/layout/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemeMappr",
  description: "Meme the World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className}`}>
        <Providers>
          {/* fit in mobile browser absolute inset-0  */}
          <div className="flex flex-col mx-auto h-[calc(100dvh)]">
            <Navbar />
            {/* <div className="relative flex-1 overflow-hidden"> */}
            {/* usually classname has container for the side margins. and pt-20 */}
            {children}
          </div>
          {/* </div> */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
