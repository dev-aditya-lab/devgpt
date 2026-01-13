import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevGPT - AI-Powered Coding Assistant",
  description: "Your AI-powered mobile companion for coding help. Get instant code generation, debugging assistance, and programming explanations on the go.",
  keywords: ["AI", "coding assistant", "programming", "developer tools", "chatbot", "code generation", "debugging"],
  authors: [{ name: "Aadi" }],
  openGraph: {
    title: "DevGPT - AI-Powered Coding Assistant",
    description: "Your AI-powered mobile companion for coding help. Get instant code generation, debugging assistance, and programming explanations on the go.",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevGPT - AI-Powered Coding Assistant",
    description: "Your AI-powered mobile companion for coding help.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
