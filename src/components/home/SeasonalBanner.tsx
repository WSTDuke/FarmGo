import { Apple, Citrus, Grape } from "lucide-react";
import Image from "next/image";

const DECOR_ICONS = [Citrus, Apple, Grape];

export function SeasonalBanner() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-12 md:px-12 md:py-16">
          <div className="pointer-events-none absolute -right-4 -top-4 flex gap-3 opacity-20 md:-right-2 md:-top-2">
            {DECOR_ICONS.map((Icon, i) => (
              <Icon
                key={i}
                className="h-24 w-24 text-white md:h-36 md:w-36"
                strokeWidth={1}
                aria-hidden
              />
            ))}
          </div>
          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
                Mùa vụ mới
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Combo trái cây tươi — Giảm đến 30%
              </h2>
              <p className="mt-4 max-w-md text-emerald-50">
                Cam, bưởi, táo, nho trong một giỏ quà — lý tưởng cho gia đình
                và biếu tặng. Chỉ áp dụng tuần này.
              </p>
              <button
                type="button"
                className="mt-6 rounded-full bg-white px-8 py-3 font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
              >
                Đặt combo ngay
              </button>
            </div>
            <div className="relative mx-auto aspect-video w-full max-w-sm overflow-hidden rounded-2xl md:max-w-md">
              <Image
                src="https://images.unsplash.com/photo-1603833665858-e61d17a96224?w=600&q=80"
                alt="Giỏ trái cây mùa vụ"
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
