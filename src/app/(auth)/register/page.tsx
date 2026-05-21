import { RegisterForm } from "@/components/auth/RegisterForm";
import { AUTH_COPY } from "@/lib/auth-config";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";

const copy = AUTH_COPY.register;

export const metadata: Metadata = {
  title: `${copy.pageTitle} — ${APP_NAME}`,
  description: copy.pageDescription,
};

export default function RegisterPage() {
  return <RegisterForm />;
}
