import { IconBox } from "@/components/ui/IconBox";
import {
  HeartHandshake,
  QrCode,
  Snowflake,
  Tractor,
  type LucideIcon,
} from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Tractor,
    title: "Trực tiếp nông trại",
    desc: "Bỏ qua trung gian — nông dân địa phương thu hoạch và đóng gói.",
  },
  {
    icon: Snowflake,
    title: "Chuỗi lạnh chuẩn",
    desc: "Giữ độ tươi từ kho đến tay bạn, đặc biệt trái cây nhập khẩu.",
  },
  {
    icon: QrCode,
    title: "Truy xuất nguồn gốc",
    desc: "Quét mã QR trên từng sản phẩm để xem vùng trồng & ngày thu hoạch.",
  },
  {
    icon: HeartHandshake,
    title: "Đổi trả 24h",
    desc: "Không hài lòng? Hoàn tiền hoặc đổi mẫu trong vòng một ngày.",
  },
];

export function WhyFarmGo() {
  return (
    <section className="border-t border-emerald-100 bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-950 md:text-3xl">
          Vì sao chọn FarmGo?
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon, title, desc }) => (
            <li
              key={title}
              className="flex flex-col items-center rounded-2xl border border-emerald-50 bg-emerald-50/30 p-6 text-center"
            >
              <IconBox icon={icon} size="md" />
              <h3 className="mt-3 font-semibold text-emerald-900">{title}</h3>
              <p className="mt-2 text-sm text-emerald-700/75">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
