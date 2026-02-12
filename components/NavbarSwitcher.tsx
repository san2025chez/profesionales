"use client";

import { usePathname } from "next/navigation";
import LandingNavbar from "./LandingNavbar";
import Navbar from "./Navbar";

export default function NavbarSwitcher() {
  const pathname = usePathname();
  if (pathname === "/") {
    return <LandingNavbar />;
  }
  return <Navbar />;
}
