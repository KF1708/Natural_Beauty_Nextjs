import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Natural Beauty",
  description: "Creating a simple beauty product app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-lime-100">
        <Navbar />
        <main className=" px-4 py-8"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
