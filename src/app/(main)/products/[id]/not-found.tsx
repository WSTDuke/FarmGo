import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-emerald-950">Không tìm thấy sản phẩm</h1>
      <p className="mt-3 text-emerald-700/80">
        Sản phẩm có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.
      </p>
      <Link
        href={ROUTES.products}
        className="mt-8 inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Xem tất cả sản phẩm
      </Link>
    </main>
  );
}
