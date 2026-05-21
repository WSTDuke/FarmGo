"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type AuthAnimatedLinkProps = ComponentProps<typeof Link>;

export function AuthAnimatedLink({
  href,
  onClick,
  children,
  ...props
}: AuthAnimatedLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        if (
          typeof document !== "undefined" &&
          "startViewTransition" in document &&
          typeof document.startViewTransition === "function"
        ) {
          e.preventDefault();
          const path =
            typeof href === "string"
              ? href
              : [href.pathname, href.query ? "?" + new URLSearchParams(href.query as Record<string, string>).toString() : ""].filter(Boolean).join("") || "/";

          document.startViewTransition(() => {
            router.push(path);
          });
        }
      }}
    >
      {children}
    </Link>
  );
}
