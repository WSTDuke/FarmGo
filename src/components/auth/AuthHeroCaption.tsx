"use client";

import { AUTH_COPY } from "@/lib/auth-config";
import { APP_NAME } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function AuthHeroCaption() {
  const pathname = usePathname();
  const description =
    pathname === "/register"
      ? AUTH_COPY.register.heroDescription
      : AUTH_COPY.login.heroDescription;

  return (
    <p
      key={pathname}
      className="mt-3 max-w-md animate-subtitle-in text-emerald-50/90"
    >
      {description} trên {APP_NAME}.
    </p>
  );
}
