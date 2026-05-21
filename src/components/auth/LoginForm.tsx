"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { AUTH_COPY } from "@/lib/auth-config";
import { Mail } from "lucide-react";
import Link from "next/link";

const copy = AUTH_COPY.login;

export function LoginForm() {
  return (
    <AuthPanel
      title={copy.panelTitle}
      subtitle={copy.panelSubtitle}
      alternatePrompt={copy.alternatePrompt}
      alternateHref={copy.alternateHref}
      alternateLabel={copy.alternateLabel}
    >
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <AuthField
          id="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          icon={Mail}
          autoComplete="email"
        />

        <PasswordField
          id="password"
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
          className="w-full rounded-xl py-4 text-base font-semibold shadow-md shadow-emerald-600/20"
        >
          {copy.submitLabel}
        </Button>
      </form>
    </AuthPanel>
  );
}
