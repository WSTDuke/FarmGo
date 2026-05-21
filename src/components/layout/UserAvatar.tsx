import { getDisplayName, getInitials } from "@/lib/user-display";
import type { User } from "@supabase/supabase-js";

type UserAvatarProps = {
  user: User;
  size?: "md" | "lg";
};

const sizeClass = {
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-sm",
};

/** Avatar tĩnh (không menu) — dùng UserAvatarMenu trên header */
export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const initials = getInitials(user);
  const displayName = getDisplayName(user);

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 font-bold text-white shadow-md shadow-emerald-500/25 ${sizeClass[size]}`}
      title={displayName}
      aria-hidden
    >
      {initials}
    </span>
  );
}
