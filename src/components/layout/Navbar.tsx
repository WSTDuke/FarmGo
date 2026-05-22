"use client";

import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = {
  isSeller?: boolean;
};

const SELLER_NAV_LINKS = [
  { href: "/seller", label: "Kênh Người Bán" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/about", label: "Giới thiệu" },
] as const;

export function Navbar({ isSeller = false }: NavbarProps) {
  const pathname = usePathname();
  const isSellerZone = isSeller || pathname.startsWith("/seller");
  const links = isSellerZone ? SELLER_NAV_LINKS : NAV_LINKS;

  return (
    <nav className="flex items-center gap-2 sm:gap-8">
      {links.map((link) => {
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
