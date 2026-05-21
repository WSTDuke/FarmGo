import { HeaderActions } from "@/components/layout/HeaderActions";
import { Navbar } from "@/components/layout/Navbar";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { Sprout } from "lucide-react";
import Link from "next/link";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[5.5rem] max-w-6xl items-center justify-between gap-6 px-4 py-5 lg:min-h-[6rem] lg:px-8 lg:py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/30 lg:h-14 lg:w-14">
            <Sprout
              className="h-6 w-6 lg:h-7 lg:w-7"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              aria-hidden
            />
          </span>
          <span className="text-xl font-bold text-emerald-800 lg:text-2xl">
            {APP_NAME}
          </span>
        </Link>
        <Navbar />
        <HeaderActions user={user} />
      </div>
    </header>
  );
}
