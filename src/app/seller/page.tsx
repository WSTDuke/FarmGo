import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/providers/CartProvider";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Coins,
  Users,
  Truck,
  ArrowRight,
  Store,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Kênh Người Bán FarmGo — Kết nối Nông sản Việt`,
  description: "Trở thành đối tác bán hàng trên FarmGo để mở rộng quy mô, tăng doanh thu nông sản sạch và tối ưu hóa vận chuyển giao hàng 2h.",
};

const BENEFITS = [
  {
    icon: Users,
    title: "Tiếp cận hàng triệu khách hàng",
    desc: "Sản phẩm của bạn sẽ được tiếp cận tới tệp khách hàng mua sắm nông sản sạch lớn và năng động nhất Việt Nam.",
  },
  {
    icon: Coins,
    title: "0đ Phí đăng ký cửa hàng",
    desc: "Bắt đầu đăng bán hoàn toàn miễn phí. Chúng tôi chỉ tính phần trăm phí dịch vụ nhỏ dựa trên doanh số thực tế của bạn.",
  },
  {
    icon: Truck,
    title: "Vận chuyển siêu tốc 2H",
    desc: "Hệ thống logistics thông minh của FarmGo chịu trách nhiệm lấy hàng và giao ngay trong 2 giờ, bảo đảm độ tươi ngon tuyệt đối.",
  },
  {
    icon: TrendingUp,
    title: "Công cụ quản lý & phân tích",
    desc: "Trang bị hệ thống thống kê doanh thu, xu hướng mua hàng và quản lý sản phẩm thông minh, trực quan.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Đăng ký tài khoản",
    desc: "Tạo tài khoản đối tác người bán FarmGo chỉ trong 2 phút với số điện thoại và email.",
  },
  {
    num: "02",
    title: "Cập nhật sản phẩm",
    desc: "Đăng tải danh sách các mặt hàng nông sản, trái cây sạch với hình ảnh và giá cả mong muốn.",
  },
  {
    num: "03",
    title: "Nhận đơn và chuẩn bị",
    desc: "Hệ thống sẽ thông báo khi có đơn hàng mới. Bạn chỉ việc chuẩn bị và đóng gói nông sản.",
  },
  {
    num: "04",
    title: "Giao hàng & Nhận tiền",
    desc: "Shipper FarmGo đến nhận hàng, giao cho khách và hệ thống đối soát thanh toán định kỳ nhanh chóng.",
  },
];

export default async function SellerLandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isSeller = user?.user_metadata?.role === "seller";
  const ctaLink = isSeller ? "/products" : "/seller/register";
  const ctaLabel = isSeller ? "Quản lý sản phẩm ngay" : "Bắt đầu bán hàng miễn phí";

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-slate-50/50">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 py-20 text-white lg:py-28">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="mx-auto max-w-6xl px-4 lg:px-8 relative z-10 grid gap-12 lg:grid-cols-5 items-center">
              <div className="lg:col-span-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-800/60 px-4 py-1.5 text-sm font-medium text-emerald-200 ring-1 ring-emerald-500/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Kênh Đối Tác Tin Cậy
                </span>
                <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Bán nông sản của bạn
                  <span className="block text-emerald-400 mt-2">trên FarmGo</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-emerald-100/80 leading-relaxed">
                  FarmGo là nền tảng kết nối hàng ngàn nông hộ, trang trại sạch với người tiêu dùng thành thị. Chúng tôi lo trọn gói từ vận chuyển đến thanh toán.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={ctaLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 active:scale-[0.98]"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  {!isSeller && (
                    <Link
                      href="/seller/login"
                      className="inline-flex items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-900/40 px-8 py-4 text-base font-semibold text-emerald-200 transition hover:bg-emerald-900/60"
                    >
                      Đăng nhập Kênh Người Bán
                    </Link>
                  )}
                </div>
              </div>

              {/* Decorative Stats Box */}
              <div className="lg:col-span-2 relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-lime-500 opacity-30 blur-lg" />
                <div className="relative rounded-3xl border border-emerald-500/30 bg-emerald-950/75 p-6 backdrop-blur-md">
                  <div className="flex items-center gap-3 border-b border-emerald-800/60 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Store className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-100">FarmGo Đối Tác</h4>
                      <p className="text-xs text-emerald-400">Cập nhật 24 giờ qua</p>
                    </div>
                  </div>

                  <dl className="mt-6 grid grid-cols-2 gap-6">
                    <div>
                      <dt className="text-sm font-medium text-emerald-300">Đơn hàng/ngày</dt>
                      <dd className="mt-1 text-2xl font-bold text-white">+ 2,500</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-emerald-300">Doanh thu đối tác</dt>
                      <dd className="mt-1 text-2xl font-bold text-white">+18% m-o-m</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-emerald-300">Tỷ lệ hủy đơn</dt>
                      <dd className="mt-1 text-2xl font-bold text-emerald-400">&lt; 1.5%</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-emerald-300">Đánh giá trung bình</dt>
                      <dd className="mt-1 text-2xl font-bold text-white">4.85 ★</dd>
                    </div>
                  </dl>

                  <div className="mt-6 rounded-xl bg-emerald-900/40 p-4 border border-emerald-800/40">
                    <p className="text-xs text-emerald-200 leading-relaxed">
                      💡 <strong>Nổi bật:</strong> Nhóm mặt hàng hoa quả hữu cơ và rau xanh Đà Lạt đang có nhu cầu tìm thêm nhà vườn cung ứng gấp trong mùa vụ này.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Tại sao chọn bán hàng trên FarmGo?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-800/70">
                Chúng tôi cung cấp giải pháp chuyển đổi số toàn diện cho nông sản Việt, đồng hành cùng bạn đưa sản phẩm chất lượng tới tay người dùng.
              </p>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <h3 className="mt-6 text-lg font-bold text-emerald-950">{item.title}</h3>
                    <p className="mt-3 text-sm text-emerald-800/75 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How it works */}
          <section className="bg-emerald-50/50 py-20">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                  Quy trình bán hàng đơn giản
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-800/70">
                  Dễ dàng kết nối, đăng bán sản phẩm và mở rộng kinh doanh chỉ với 4 bước đơn giản.
                </p>
              </div>

              <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="rounded-3xl bg-white p-8 border border-emerald-100 shadow-sm h-full">
                      <span className="text-5xl font-black text-emerald-100 block mb-4">
                        {step.num}
                      </span>
                      <h3 className="text-lg font-bold text-emerald-950">{step.title}</h3>
                      <p className="mt-3 text-sm text-emerald-800/70 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className="absolute right-0 top-1/2 hidden h-0.5 w-8 translate-x-4 bg-emerald-200 lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ/Info Alert Section */}
          <section className="mx-auto max-w-4xl px-4 py-20 text-center">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 px-6 py-12 text-white shadow-xl sm:px-12 sm:py-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sẵn sàng tiếp cận hàng ngàn khách hàng mới?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-emerald-100/90 leading-relaxed">
                Đăng ký ngay hôm nay để nhận ưu đãi giảm 50% phí dịch vụ đối tác trong 3 tháng đầu tiên.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href={ctaLink}
                  className="rounded-full bg-white px-8 py-4 text-base font-semibold text-emerald-900 shadow-lg transition hover:bg-emerald-50 active:scale-[0.98]"
                >
                  {ctaLabel}
                </Link>
                {!isSeller && (
                  <Link
                    href="/seller/login"
                    className="rounded-full border border-emerald-400 bg-emerald-700/50 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-700/80"
                  >
                    Đã có tài khoản
                  </Link>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
