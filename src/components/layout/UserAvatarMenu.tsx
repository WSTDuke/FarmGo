"use client";

import { ROUTES } from "@/lib/constants";
import { getDisplayName, getInitials } from "@/lib/user-display";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";
import { ChevronDown, LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type UserAvatarMenuProps = {
  user: User;
};

export function UserAvatarMenu({ user }: UserAvatarMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const displayName = getDisplayName(user);
  const initials = getInitials(user);
  const email = user.email ?? "";

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setSigningOut(false);
    setOpen(false);
    router.push(ROUTES.home);
    router.refresh();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-emerald-200 py-1 pl-1 pr-2.5 transition hover:border-emerald-300 hover:bg-emerald-50",
          open && "border-emerald-300 bg-emerald-50",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Menu tài khoản ${displayName}`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-sm font-bold text-white shadow-md shadow-emerald-500/25">
          {initials}
        </span>
        <span className="hidden max-w-[100px] truncate text-sm font-medium text-emerald-900 sm:inline">
          {displayName}
        </span>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 text-emerald-600 transition sm:block",
            open && "rotate-180",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] w-56 overflow-hidden rounded-xl border border-emerald-100 bg-white py-1 shadow-xl shadow-emerald-900/10"
        >
          <div className="border-b border-emerald-50 px-4 py-3">
            <p className="truncate text-sm font-semibold text-emerald-950">
              {displayName}
            </p>
            {email && (
              <p className="truncate text-xs text-emerald-600/80">{email}</p>
            )}
          </div>

          <Link
            href={ROUTES.account}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-emerald-800 transition hover:bg-emerald-50"
          >
            <UserIcon className="h-4 w-4 text-emerald-600" strokeWidth={2} aria-hidden />
            Thông tin tài khoản
          </Link>
          <Link
            href={ROUTES.settings}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-emerald-800 transition hover:bg-emerald-50"
          >
            <Settings
              className="h-4 w-4 text-emerald-600"
              strokeWidth={2}
              aria-hidden
            />
            Cài đặt
          </Link>
          <div className="my-1 border-t border-emerald-50" />
          <button
            type="button"
            role="menuitem"
            disabled={signingOut}
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden />
            {signingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
      )}
    </div>
  );
}
