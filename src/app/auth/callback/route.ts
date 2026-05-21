import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? ROUTES.home;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const safeNext =
        next.startsWith("/") && !next.startsWith("//") ? next : ROUTES.home;
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(
    `${origin}${ROUTES.forgotPassword}?error=invalid_link`,
  );
}
