import { Navbar } from "@/components/layout/Navbar";
import { APP_NAME } from "@/lib/constants";
import { LogIn, Sprout, UserPlus } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/30">
            <Sprout
              className="h-5 w-5"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              aria-hidden
            />
          </span>
          <span className="text-xl font-bold text-emerald-800">{APP_NAME}</span>
        </Link>
        <Navbar />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50 sm:px-4"
          >
            <UserPlus
              className="h-4 w-4"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              aria-hidden
            />
            <span className="hidden sm:inline">Đăng ký</span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 sm:px-4"
          >
            <LogIn
              className="h-4 w-4"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              aria-hidden
            />
            <span className="hidden sm:inline">Đăng nhập</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
