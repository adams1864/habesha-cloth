import { ColorSchemeScript } from "@mantine/core";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
  <html lang={routing.defaultLocale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
