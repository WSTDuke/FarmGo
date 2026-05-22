"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { mapAuthError } from "@/lib/auth-errors";
import { AUTH_COPY } from "@/lib/auth-config";
import { ROUTES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const copy = AUTH_COPY.login;

export type LoginFormProps = {
  roleRequirement?: "seller" | "buyer";
};

export function LoginForm({ roleRequirement = "buyer" }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resetSuccess = searchParams.get("reset") === "success";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setLoading(false);
      setError(mapAuthError(authError.message));
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Không thể tải thông tin người dùng.");
      return;
    }

    const role = user.user_metadata?.role || "buyer";

    if (roleRequirement === "seller" && role !== "seller") {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Tài khoản này không phải là tài khoản người bán.");
      return;
    }

    if (roleRequirement === "buyer" && role === "seller") {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Tài khoản người bán vui lòng đăng nhập tại kênh người bán.");
      return;
    }

    setLoading(false);

    const next = searchParams.get("next");
    const defaultDest = role === "seller" ? "/seller" : ROUTES.home;
    const destination =
      next?.startsWith("/") && !next.startsWith("//") ? next : defaultDest;
    router.push(destination);
    router.refresh();
  }

  return (
    <AuthPanel
      title={roleRequirement === "seller" ? "Đăng nhập Kênh Người Bán" : copy.panelTitle}
      subtitle={roleRequirement === "seller" ? "Đăng nhập để quản lý gian hàng của bạn" : copy.panelSubtitle}
      alternatePrompt={roleRequirement === "seller" ? "Bạn muốn bán hàng cùng FarmGo?" : copy.alternatePrompt}
      alternateHref={roleRequirement === "seller" ? "/seller/register" : copy.alternateHref}
      alternateLabel={roleRequirement === "seller" ? "Đăng ký ngay" : copy.alternateLabel}
      homeHref={roleRequirement === "seller" ? "/seller" : "/"}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {resetSuccess && (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Đặt lại mật khẩu thành công. Vui lòng đăng nhập bằng mật khẩu mới.
          </p>
        )}
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
          label="Email"
          type="email"
          placeholder="email@example.com"
          icon={Mail}
          autoComplete="email"
        />

        <PasswordField
          id="password"
          name="password"
          label="Mật khẩu"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-base">
          <label className="flex items-center gap-2.5 text-emerald-800">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
            />
            Ghi nhớ đăng nhập
          </label>
          <Link
            href={ROUTES.forgotPassword}
            className="font-medium text-emerald-700 hover:text-emerald-900"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-4 text-base font-semibold shadow-md shadow-emerald-600/20"
        >
          {loading ? "Đang đăng nhập..." : (roleRequirement === "seller" ? "Đăng nhập Bán hàng" : copy.submitLabel)}
        </Button>
      </form>
    </AuthPanel>
  );
}
