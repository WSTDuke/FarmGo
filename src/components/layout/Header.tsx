import { Navbar } from "@/components/layout/Navbar";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-lg shadow-md shadow-emerald-500/30">
            🌱
          </span>
          <span className="text-xl font-bold text-emerald-800">{APP_NAME}</span>
        </Link>
        <Navbar />
        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50"
          >
            Giỏ hàng 🛒
          </button>
        </div>
      </div>
    </header>
  );
}
