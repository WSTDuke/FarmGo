"use client";

import { usePathname } from "next/navigation";

type AuthPageTransitionProps = {
  children: React.ReactNode;
};

export function AuthPageTransition({ children }: AuthPageTransitionProps) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      style={{ viewTransitionName: "auth-form-panel" }}
      className="animate-auth-page-in w-full"
    >
      {children}
    </div>
  );
}
