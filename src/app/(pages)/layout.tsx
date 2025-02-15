"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Paths where Navbar and Footer should be hidden
  const shouldHideLayout =
    pathname.includes("/admin") ||
    pathname.includes("/login") ||
    pathname.includes("/signup") ||
    pathname.includes("/resetPassword");
  return (
    <main>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </main>
  );
}
