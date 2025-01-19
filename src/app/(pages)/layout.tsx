"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Paths where Navbar and Footer should be hidden
  const noLayoutPaths = [
    "/login",
    "/signup",
    "/resetPassword",
    "/admin/addTeamMember",
    "/admin",
  ];

  const shouldHideLayout = noLayoutPaths.includes(pathname);
  return (
    <main>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </main>
  );
}
