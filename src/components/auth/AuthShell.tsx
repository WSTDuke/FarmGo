import { AuthHeroCaption } from "@/components/auth/AuthHeroCaption";
import { AUTH_HERO, AUTH_IMAGE } from "@/lib/auth-config";
import Image from "next/image";

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative h-48 lg:hidden">
        <Image
          src={AUTH_IMAGE}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-emerald-900/50" />
      </section>

      <section className="flex items-center justify-center bg-white lg:order-1">
        {children}
      </section>

      <section className="relative hidden min-h-screen lg:order-2 lg:block">
        <Image
          src={AUTH_IMAGE}
          alt="Nông sản tươi — trái cây và rau củ"
          fill
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/40 to-emerald-800/20" />
        <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
            {AUTH_HERO.tagline}
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight">
            {AUTH_HERO.title}
            <br />
            {AUTH_HERO.titleLine2}
          </h2>
          <AuthHeroCaption />
        </div>
      </section>
    </main>
  );
}
