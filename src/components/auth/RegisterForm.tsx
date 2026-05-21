"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { AuthStepIndicator } from "@/components/auth/AuthStepIndicator";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { AUTH_COPY, REGISTER_STEPS } from "@/lib/auth-config";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const copy = AUTH_COPY.register;
const TOTAL_STEPS = REGISTER_STEPS.length;
const STEP_MS = 220;
const FIELDS_MIN_H = "min-h-[17.5rem]";

type StepDirection = "forward" | "back";

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [displayStep, setDisplayStep] = useState(1);
  const [direction, setDirection] = useState<StepDirection>("forward");
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    if (form.checkValidity()) {
      goNext();
    } else {
      form.reportValidity();
    }
  };

  const stepAnimClass =
    phase === "exit"
      ? direction === "forward"
        ? "animate-step-exit-forward"
        : "animate-step-exit-back"
      : direction === "forward"
        ? "animate-step-enter-forward"
        : "animate-step-enter-back";

  return (
    <AuthPanel
      title={copy.panelTitle}
      subtitle={copy.panelSubtitle}
      alternatePrompt={copy.alternatePrompt}
      alternateHref={copy.alternateHref}
      alternateLabel={copy.alternateLabel}
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
        onSubmit={(e) => e.preventDefault()}
      >
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
                />
                <AuthField
                  id="phone"
                  label="Số điện thoại"
                  type="tel"
                  placeholder="0901234567"
                  icon={Phone}
                  autoComplete="tel"
                />
                <AuthField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                  icon={Mail}
                  autoComplete="email"
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
                disabled={isTransitioning}
                onClick={goBack}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-transform active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" strokeWidth={2} />
                Quay lại
              </Button>
              {step < TOTAL_STEPS ? (
                <Button
                  type="button"
                  disabled={isTransitioning}
                  onClick={handleContinue}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-transform active:scale-[0.98]"
                >
                  Tiếp tục
                  <ArrowRight className="h-5 w-5" strokeWidth={2} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isTransitioning}
                  className="flex-1 rounded-xl py-4 text-base font-semibold transition-transform active:scale-[0.98]"
                >
                  {copy.submitLabel}
                </Button>
              )}
            </div>
          ) : (
            <Button
              type="button"
              disabled={isTransitioning}
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
