"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { mapAuthError } from "@/lib/auth-errors";
import { AUTH_COPY } from "@/lib/auth-config";
import { ROUTES } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";
import { createClient } from "@/lib/supabase/client";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const copy = AUTH_COPY.forgotPassword;

type Mode = "request" | "sent" | "reset" | "invalid";

export function ForgotPasswordFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetParam = searchParams.get("reset") === "1";
  const linkError = searchParams.get("error") === "invalid_link";

  const [mode, setMode] = useState<Mode>(
    linkError ? "invalid" : resetParam ? "reset" : "request",
  );
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(resetParam);
  const [error, setError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState("");

  useEffect(() => {
    if (!resetParam || linkError) return;

    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCheckingSession(false);
      if (session) {
        setMode("reset");
      } else {
        setMode("invalid");
      }
    });
  }, [resetParam, linkError]);

  async function handleRequestEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!email) {
      setError("Vui lòng nhập email.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const redirectTo = `${getSiteUrl()}${ROUTES.authCallback}?next=${encodeURIComponent(`${ROUTES.forgotPassword}?reset=1`)}`;

    const { error: authError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo },
    );

    setLoading(false);

    if (authError) {
      setError(mapAuthError(authError.message));
      return;
    }

    setSentEmail(email);
    setMode("sent");
  }

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    )?.value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    )?.value;

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (authError) {
      setError(mapAuthError(authError.message));
      return;
    }

    await supabase.auth.signOut();
    router.push(`${ROUTES.login}?reset=success`);
    router.refresh();
  }

  if (checkingSession) {
    return (
      <AuthPanel
        title={copy.panelTitle}
        subtitle="Đang xác minh liên kết..."
        alternatePrompt={copy.alternatePrompt}
        alternateHref={copy.alternateHref}
        alternateLabel={copy.alternateLabel}
        hideAlternateFooter
      >
        <p className="text-center text-emerald-700/80">Vui lòng đợi trong giây lát.</p>
      </AuthPanel>
    );
  }

  if (mode === "sent") {
    return (
      <AuthPanel
        title={copy.panelTitle}
        subtitle="Kiểm tra hộp thư email của bạn."
        alternatePrompt={copy.alternatePrompt}
        alternateHref={copy.alternateHref}
        alternateLabel={copy.alternateLabel}
        hideAlternateFooter
      >
        <div className="animate-auth-page-in py-4 text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Mail className="h-10 w-10" strokeWidth={1.75} aria-hidden />
          </span>
          <h2 className="mt-8 text-2xl font-bold text-emerald-950">
            Đã gửi email khôi phục
          </h2>
          <p className="mt-4 text-base leading-relaxed text-emerald-700/80">
            Bấm liên kết trong email để quay lại trang quên mật khẩu và đặt
            mật khẩu mới.
          </p>
          <p className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm font-medium text-emerald-900">
            {sentEmail}
          </p>
          <p className="mt-4 text-sm text-emerald-600/70">
            Không thấy email? Kiểm tra thư mục spam.
          </p>
          <button
            type="button"
            onClick={() => {
              setMode("request");
              setSentEmail("");
            }}
            className="mt-8 text-sm font-medium text-emerald-700 hover:text-emerald-900"
          >
            Gửi lại email
          </button>
        </div>
      </AuthPanel>
    );
  }

  if (mode === "invalid") {
    return (
      <AuthPanel
        title={copy.panelTitle}
        subtitle="Liên kết không hợp lệ hoặc đã hết hạn."
        alternatePrompt={copy.alternatePrompt}
        alternateHref={copy.alternateHref}
        alternateLabel={copy.alternateLabel}
      >
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Vui lòng nhập email và yêu cầu gửi lại liên kết khôi phục mật khẩu.
        </p>
        <Button
          type="button"
          onClick={() => {
            setMode("request");
            setError(null);
            router.replace(ROUTES.forgotPassword);
          }}
          className="mt-6 w-full rounded-xl py-4 text-base font-semibold"
        >
          Gửi email khôi phục
        </Button>
      </AuthPanel>
    );
  }

  if (mode === "reset") {
    return (
      <AuthPanel
        title="Đặt mật khẩu mới"
        subtitle="Nhập mật khẩu mới và xác nhận để hoàn tất."
        alternatePrompt={copy.alternatePrompt}
        alternateHref={copy.alternateHref}
        alternateLabel={copy.alternateLabel}
      >
        <form className="space-y-6" onSubmit={handleResetPassword}>
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <span className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <KeyRound className="h-7 w-7" strokeWidth={1.75} aria-hidden />
          </span>
          <PasswordField
            id="password"
            name="password"
            label="Mật khẩu mới"
            autoComplete="new-password"
          />
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-4 text-base font-semibold shadow-md shadow-emerald-600/20"
          >
            {loading ? "Đang lưu..." : "Cập nhật mật khẩu"}
          </Button>
        </form>
      </AuthPanel>
    );
  }

  return (
    <AuthPanel
      title={copy.panelTitle}
      subtitle={copy.panelSubtitle}
      alternatePrompt={copy.alternatePrompt}
      alternateHref={copy.alternateHref}
      alternateLabel={copy.alternateLabel}
    >
      <form className="space-y-6" onSubmit={handleRequestEmail}>
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        <AuthField
          id="email"
          name="email"
          label="Email đăng ký"
          type="email"
          placeholder="email@example.com"
          icon={Mail}
          autoComplete="email"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-4 text-base font-semibold shadow-md shadow-emerald-600/20"
        >
          {loading ? "Đang gửi..." : copy.submitLabel}
        </Button>
      </form>
    </AuthPanel>
  );
}
