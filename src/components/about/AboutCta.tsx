import Link from "next/link";

export function AboutCta() {
  return (
    <section className="bg-gradient-to-b from-white to-emerald-50 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">
          Sẵn sàng trải nghiệm nông sản tươi?
        </h2>
        <p className="mt-4 text-emerald-700/80">
          Đăng ký tài khoản miễn phí — nhận ưu đãi cho thành viên mới và giao
          hàng nhanh ngay tuần này.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
          >
            Đăng ký miễn phí
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-emerald-200 bg-white px-8 py-3.5 text-base font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </section>
  );
}
