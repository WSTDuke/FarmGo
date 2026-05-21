"use client";

import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

type PasswordFieldProps = {
  id: string;
  label: string;
  autoComplete?: string;
  placeholder?: string;
};

export function PasswordField({
  id,
  label,
  autoComplete = "current-password",
  placeholder = "••••••••",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-base font-medium text-emerald-900"
      >
        {label}
      </label>
      <div className="relative">
        <Lock
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500"
          strokeWidth={2}
          aria-hidden
        />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="rounded-xl border-emerald-200 py-3.5 pl-12 pr-12 text-base"
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
