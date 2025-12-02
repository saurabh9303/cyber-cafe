import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/SessionProvider";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Saurabh Cafe - Fast & Secure Cyber Services",
  description: "Created by Saurabh (SK Developer)",
  authors: [{ name: "Saurabh SK" }],
  creator: "Saurabh",
  keywords: ["Saurabh", "SK Developer", "Cyber Cafe Project"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navbar />
          {children}
          <Footer />
          <ChatWidget />
        </Provider>
      </body>
    </html>
  );
}
