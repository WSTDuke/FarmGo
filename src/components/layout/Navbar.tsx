import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex gap-1 sm:gap-6">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-lg px-2 py-1 text-sm font-medium text-emerald-800/90 transition hover:bg-emerald-50 hover:text-emerald-900 sm:text-base"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="#san-pham"
        className="hidden rounded-lg px-2 py-1 text-sm font-medium text-emerald-600 sm:inline sm:text-base"
      >
        Sản phẩm
      </Link>
    </nav>
  );
}
