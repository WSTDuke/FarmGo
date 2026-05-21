import { APP_NAME, ROUTES } from "@/lib/constants";
import { Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-500 text-white">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1400&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-20 lg:px-8 lg:py-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          <Leaf className="h-4 w-4" strokeWidth={2} aria-hidden />
          Về chúng tôi
        </span>
        <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
          {APP_NAME} — Nông sản tươi, minh bạch từ nông trại
        </h1>
        <p className="mt-6 max-w-xl text-lg text-emerald-50/95">
          Chúng tôi kết nối nông dân địa phương với gia đình đô thị, mang trái
          cây, rau củ và thực phẩm sạch đến bàn ăn của bạn trong vòng vài giờ.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/register"
            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
          >
            Tham gia ngay
          </Link>
          <Link
            href={ROUTES.products}
            className="rounded-full border-2 border-white/80 px-8 py-3.5 text-base font-semibold transition hover:bg-white/10"
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
