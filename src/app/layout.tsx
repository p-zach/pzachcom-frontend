import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Noto_Sans, Roboto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Porter Zach",
  description: "Porter Zach's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${robotoSerif.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <div className="text-gray-950 dark:text-gray-50 bg-white dark:bg-gray-800 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
