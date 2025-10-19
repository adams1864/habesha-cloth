import type { ReactNode } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col container">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
