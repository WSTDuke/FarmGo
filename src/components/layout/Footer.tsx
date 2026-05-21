import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-emerald-950 text-emerald-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold text-white">{APP_NAME}</p>
          <p className="mt-2 text-sm text-emerald-200/80">
            Nông sản tươi — trái cây, rau củ, thực phẩm & hoa từ nông trại
            đến bàn ăn của bạn.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Liên kết</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Tin tức
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Liên hệ</p>
          <p className="mt-3 text-sm text-emerald-200/80">
            Hotline: 1900 xxxx
            <br />
            Email: hello@farmgo.vn
          </p>
        </div>
      </div>
      <div className="border-t border-emerald-800 py-4 text-center text-sm text-emerald-300/70">
        © {new Date().getFullYear()} {APP_NAME}. Nông sản tươi mỗi ngày.
      </div>
    </footer>
  );
}
