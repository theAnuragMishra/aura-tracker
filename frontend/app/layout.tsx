import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SocketProvider } from "@/context/SocketContext";
import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import jwt from "jsonwebtoken";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aura Tracker",
  description: "where aura shines",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();
  // console.log("root", user);
  const userData = await getUserDetails(user!);

  const token = jwt.sign(userData, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SocketProvider token={token}>{children}</SocketProvider>
      </body>
    </html>
  );
}
