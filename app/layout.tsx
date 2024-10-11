import "./globals.css";
import type { Metadata } from "next";
import { Content, Inter } from "next/font/google";
import { ClerkProvider, SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, ConvexReactClient, Unauthenticated } from "convex/react";
import ClerkConvexProvider from "./components/ClerkConvexProvider";


export const metadata: Metadata = {
  title: "My Web Comic",
  description: "A CMS for your web comic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <ClerkConvexProvider>
        {children}
      </ClerkConvexProvider>
      </body>
    </html>
  );
}