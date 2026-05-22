"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { AuthStepIndicator } from "@/components/auth/AuthStepIndicator";
import { RegisterEmailConfirm } from "@/components/auth/RegisterEmailConfirm";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { mapAuthError } from "@/lib/auth-errors";
import { AUTH_COPY, REGISTER_STEPS } from "@/lib/auth-config";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

const copy = AUTH_COPY.register;
const TOTAL_STEPS = REGISTER_STEPS.length;
const STEP_MS = 220;
const FIELDS_MIN_H = "min-h-[17.5rem]";

type StepDirection = "forward" | "back";

type ProfileFields = {
  fullName: string;
  phone: string;
  email: string;
};

export type RegisterFormProps = {
  role?: "seller" | "buyer";
};

export function RegisterForm({ role = "buyer" }: RegisterFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ProfileFields | null>(null);
  const [displayStep, setDisplayStep] = useState(1);
  const [direction, setDirection] = useState<StepDirection>("forward");
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const changeStep = useCallback(
    (next: number, dir: StepDirection) => {
      if (isTransitioning || next === step) return;

      setIsTransitioning(true);
      setDirection(dir);
      setPhase("exit");

      window.setTimeout(() => {
        setStep(next);
        setDisplayStep(next);
        setPhase("enter");

        window.setTimeout(() => {
          setIsTransitioning(false);
        }, 350);
      }, STEP_MS);
    },
    [isTransitioning, step],
  );

  const goNext = () => changeStep(Math.min(step + 1, TOTAL_STEPS), "forward");
  const goBack = () => changeStep(Math.max(step - 1, 1), "back");

  const handleContinue = () => {
    const form = formRef.current;
    if (!form || isTransitioning) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (step === 1) {
      const fd = new FormData(form);
      const email = String(fd.get("email") ?? "").trim();
      const fullName = String(fd.get("fullName") ?? "").trim();
      const phone = String(fd.get("phone") ?? "").trim();

      if (!email || !fullName || !phone) {
        setError("Vui lòng điền đầy đủ họ tên, số điện thoại và email.");
        return;
      }

      setProfile({ fullName, phone, email });
    }

    setError(null);
    goNext();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = formRef.current;
    if (!form) return;

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

    if (!profile) {
      setError("Vui lòng hoàn thành bước thông tin cá nhân trước.");
      changeStep(1, "back");
      return;
    }

    const { email, fullName, phone } = profile;

    if (!email || !password) {
      setError("Vui lòng điền email và mật khẩu.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role,
        },
        emailRedirectTo: `${window.location.origin}${role === "seller" ? "/seller/login" : "/login"}`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(mapAuthError(authError.message));
      return;
    }

    if (data.session) {
      router.push(role === "seller" ? "/seller" : "/");
      router.refresh();
      return;
    }

    setPendingEmail(email);
  }

  const stepAnimClass =
    phase === "exit"
      ? direction === "forward"
        ? "animate-step-exit-forward"
        : "animate-step-exit-back"
      : direction === "forward"
        ? "animate-step-enter-forward"
        : "animate-step-enter-back";

  if (pendingEmail) {
    return (
      <AuthPanel
        title={role === "seller" ? "Đăng ký Kênh Người Bán" : copy.panelTitle}
        subtitle="Xác nhận email để hoàn tất đăng ký."
        alternatePrompt={role === "seller" ? "Đã có tài khoản người bán?" : copy.alternatePrompt}
        alternateHref={role === "seller" ? "/seller/login" : copy.alternateHref}
        alternateLabel={role === "seller" ? "Đăng nhập ngay" : copy.alternateLabel}
        hideTitleBlock
        hideAlternateFooter
        homeHref={role === "seller" ? "/seller" : "/"}
      >
        <RegisterEmailConfirm email={pendingEmail} role={role} />
      </AuthPanel>
    );
  }

  return (
    <AuthPanel
      title={role === "seller" ? "Đăng ký Kênh Người Bán" : copy.panelTitle}
      subtitle={role === "seller" ? "Trở thành đối tác bán hàng cùng FarmGo" : copy.panelSubtitle}
      alternatePrompt={role === "seller" ? "Đã có tài khoản người bán?" : copy.alternatePrompt}
      alternateHref={role === "seller" ? "/seller/login" : copy.alternateHref}
      alternateLabel={role === "seller" ? "Đăng nhập ngay" : copy.alternateLabel}
      homeHref={role === "seller" ? "/seller" : "/"}
      pinnedHeader={
        <AuthStepIndicator
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          labels={REGISTER_STEPS}
        />
      }
      hideTitleBlock
    >
      <form
        ref={formRef}
        className="mt-2 space-y-6"
        onSubmit={handleSubmit}
      >
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className={cn("overflow-hidden", FIELDS_MIN_H)}>
          <div key={displayStep} className={cn("space-y-6", stepAnimClass)}>
            {displayStep === 1 && (
              <>
                <AuthField
                  id="fullName"
                  label="Họ và tên"
                  placeholder="Nguyễn Văn A"
                  icon={User}
                  autoComplete="name"
                  defaultValue={profile?.fullName}
                />
                <AuthField
                  id="phone"
                  label="Số điện thoại"
                  type="tel"
                  placeholder="0901234567"
                  icon={Phone}
                  autoComplete="tel"
                  defaultValue={profile?.phone}
                />
                <AuthField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                  icon={Mail}
                  autoComplete="email"
                  defaultValue={profile?.email}
                />
              </>
            )}

            {displayStep === 2 && (
              <>
                <PasswordField
                  id="password"
                  label="Mật khẩu"
                  autoComplete="new-password"
                />
                <PasswordField
                  id="confirmPassword"
                  label="Xác nhận mật khẩu"
                  autoComplete="new-password"
                />
                <label className="flex items-start gap-3 text-base text-emerald-800">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    Tôi đồng ý với{" "}
                    <Link
                      href="#"
                      className="font-medium text-emerald-700 hover:underline"
                    >
                      điều khoản sử dụng
                    </Link>{" "}
                    của FarmGo
                  </span>
                </label>
              </>
            )}
          </div>
        </div>

        <div className="min-h-14 pt-2">
          {step > 1 ? (
            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                disabled={isTransitioning || loading}
                onClick={goBack}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-transform active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" strokeWidth={2} />
                Quay lại
              </Button>
              {step < TOTAL_STEPS ? (
                <Button
                  type="button"
                  disabled={isTransitioning || loading}
                  onClick={handleContinue}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-transform active:scale-[0.98]"
                >
                  Tiếp tục
                  <ArrowRight className="h-5 w-5" strokeWidth={2} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isTransitioning || loading}
                  className="flex-1 rounded-xl py-4 text-base font-semibold transition-transform active:scale-[0.98]"
                >
                  {loading ? "Đang tạo tài khoản..." : copy.submitLabel}
                </Button>
              )}
            </div>
          ) : (
            <Button
              type="button"
              disabled={isTransitioning || loading}
              onClick={handleContinue}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-transform active:scale-[0.98]"
            >
              Tiếp tục
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Button>
          )}
        </div>
      </form>
    </AuthPanel>
  );
}
