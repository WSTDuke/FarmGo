import { HERO_IMAGES } from "@/data/products.mock";
import Image from "next/image";
import Link from "next/link";

const FLOATING_EMOJI = ["🍎", "🍊", "🍇", "🥬", "🍓", "🥕", "🌽", "🍋", "🥝", "🌸"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      <div className="pointer-events-none absolute inset-0">
        {FLOATING_EMOJI.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20 md:text-4xl animate-float"
            style={{
              left: `${(i * 11) % 90}%`,
              top: `${(i * 17) % 80}%`,
              animationDelay: `${i * 0.4}s`,
            }}
            aria-hidden
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24 lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Nông sản tươi — Giao trong 2 giờ
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-emerald-950 md:text-5xl lg:text-6xl">
            Trái ngọt, rau xanh
            <span className="block text-emerald-600">từ nông trại đến bàn ăn</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-emerald-800/80">
            FarmGo kết nối bạn với hàng trăm loại trái cây, hoa quả, thực phẩm
            sạch — thu hoạch trong ngày, giao tận cửa, giá minh bạch.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#san-pham"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
            >
              Mua ngay
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-8 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-50"
            >
              Tìm hiểu FarmGo
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-emerald-200/60 pt-8">
            {[
              { value: "500+", label: "Sản phẩm" },
              { value: "2h", label: "Giao nhanh" },
              { value: "100%", label: "Nguồn gốc rõ" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-emerald-700">{stat.value}</dt>
                <dd className="text-sm text-emerald-700/70">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-lg">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-200/80 to-lime-200/60 blur-2xl" />
          <div className="relative h-full w-full rounded-3xl bg-emerald-600/10 p-4 ring-1 ring-emerald-200/50">
            <Image
              src="https://images.unsplash.com/photo-1619566636858-adf3ef3cf0af?w=700&q=85"
              alt="Giỏ trái cây tươi đa dạng"
              fill
              className="rounded-2xl object-cover shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {HERO_IMAGES.map((img) => (
            <div
              key={img.alt}
              className={`absolute hidden h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-xl md:block lg:h-28 lg:w-28 ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
