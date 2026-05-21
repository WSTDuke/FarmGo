import { ForgotPasswordFlow } from "@/components/auth/ForgotPasswordFlow";
import { AUTH_COPY } from "@/lib/auth-config";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Suspense } from "react";

const copy = AUTH_COPY.forgotPassword;

export const metadata: Metadata = {
  title: `${copy.pageTitle} — ${APP_NAME}`,
  description: copy.pageDescription,
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordFlow />
    </Suspense>
  );
}
