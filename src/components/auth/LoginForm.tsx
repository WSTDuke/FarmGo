"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { mapAuthError } from "@/lib/auth-errors";
import { AUTH_COPY } from "@/lib/auth-config";
import { createClient } from "@/lib/supabase/client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const copy = AUTH_COPY.login;

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    setLoading(false);

    if (authError) {
      setError(mapAuthError(authError.message));
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <AuthPanel
      title={copy.panelTitle}
      subtitle={copy.panelSubtitle}
      alternatePrompt={copy.alternatePrompt}
      alternateHref={copy.alternateHref}
      alternateLabel={copy.alternateLabel}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            href="#"
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
          {loading ? "Đang đăng nhập..." : copy.submitLabel}
        </Button>
      </form>
    </AuthPanel>
  );
}
