import { CartButton } from "@/components/layout/CartButton";
import { UserAvatarMenu } from "@/components/layout/UserAvatarMenu";
import { ROUTES } from "@/lib/constants";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type HeaderActionsProps = {
  user: User | null;
};

export function HeaderActions({ user }: HeaderActionsProps) {
  if (user) {
    return (
      <div className="flex items-center gap-3 sm:gap-4">
        <CartButton />
        <UserAvatarMenu user={user} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href={ROUTES.register}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 px-4 py-2.5 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50 sm:px-5 sm:py-3 sm:text-base"
      >
        <UserPlus
          className="h-5 w-5"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          aria-hidden
        />
        <span className="hidden sm:inline">Đăng ký</span>
      </Link>
      <Link
        href={ROUTES.login}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 sm:px-5 sm:py-3 sm:text-base"
      >
        <LogIn
          className="h-5 w-5"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          aria-hidden
        />
        <span className="hidden sm:inline">Đăng nhập</span>
      </Link>
    </div>
  );
}
