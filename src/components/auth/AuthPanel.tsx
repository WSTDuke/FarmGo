import { AuthAnimatedLink } from "@/components/auth/AuthAnimatedLink";
import Link from "next/link";

type AuthPanelProps = {
  title: string;
  subtitle: string;
  subtitleKey?: string | number;
  children: React.ReactNode;
  alternatePrompt: string;
  alternateHref: string;
  alternateLabel: string;
  /** Header cố định: stepper, v.v. — không bị ảnh hưởng khi đổi bước form */
  pinnedHeader?: React.ReactNode;
  /** Ẩn khối tiêu đề lớn (dùng cho đăng ký — tiêu đề nằm trong stepper) */
  hideTitleBlock?: boolean;
  hideAlternateFooter?: boolean;
  homeHref?: string;
};

export function AuthPanel({
  title,
  subtitle,
  subtitleKey,
  children,
  alternatePrompt,
  alternateHref,
  alternateLabel,
  pinnedHeader,
  hideTitleBlock = false,
  hideAlternateFooter = false,
  homeHref = "/",
}: AuthPanelProps) {
  return (
    <div className="flex w-full max-w-xl flex-col justify-center px-6 py-14 sm:px-12 lg:px-20">
      <div className="shrink-0">
        <Link
          href={homeHref}
          className="mb-10 inline-block text-base font-medium text-emerald-700 transition-colors hover:text-emerald-900"
        >
          ← Về trang chủ
        </Link>

        {pinnedHeader}

        {!hideTitleBlock && (
          <>
            <h1 className="text-4xl font-bold tracking-tight text-emerald-950">
              {title}
            </h1>
            <p
              key={subtitleKey ?? subtitle}
              className="mt-3 animate-subtitle-in text-base text-emerald-700/75"
            >
              {subtitle}
            </p>
          </>
        )}
      </div>

      <div className="mt-8">{children}</div>

      {!hideAlternateFooter && (
        <p className="mt-10 shrink-0 text-center text-base text-emerald-700/80">
          {alternatePrompt}{" "}
          <AuthAnimatedLink
            href={alternateHref}
            className="font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
          >
            {alternateLabel}
          </AuthAnimatedLink>
        </p>
      )}
    </div>
  );
}
