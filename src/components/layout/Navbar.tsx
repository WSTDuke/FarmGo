"use client";

import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 sm:gap-8">
      {NAV_LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-xl px-3 py-2.5 text-base font-medium transition lg:px-4 lg:py-3 lg:text-lg ${
              active
                ? "bg-emerald-100 text-emerald-900"
                : "text-emerald-800/90 hover:bg-emerald-50 hover:text-emerald-900"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
