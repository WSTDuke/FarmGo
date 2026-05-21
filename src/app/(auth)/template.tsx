import { AuthPageTransition } from "@/components/auth/AuthPageTransition";

export default function AuthTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthPageTransition>{children}</AuthPageTransition>;
}
