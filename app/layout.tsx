import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ThemeProvider } from "./_components/ThemeProvider";
import ScrollMouseIcon from "./_components/ScrollMouseIcon";
import Preloader from "./_components/Preloader";
import Chatbot from "./_components/chatbot/Chatbot"; // ✅ Tambahkan import Chatbot

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Nawfal - %s",
    default: "Nawfal - Frontend Web Developer",
  },
  description:
    "Nawfal Irfan, web developer. Creating intuitive, visually stunning and highly functional web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${raleway.className} antialiased bg-white dark:bg-dark-100 text-dark-200 dark:text-stone-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          {children}
          <ScrollMouseIcon />
          <Chatbot /> {/* ✅ Tambahkan komponen Chatbot di sini */}
        </ThemeProvider>
      </body>
    </html>
  );
}
