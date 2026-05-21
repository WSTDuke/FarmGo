const FEATURES = [
  {
    emoji: "🚜",
    title: "Trực tiếp nông trại",
    desc: "Bỏ qua trung gian — nông dân địa phương thu hoạch và đóng gói.",
  },
  {
    emoji: "❄️",
    title: "Chuỗi lạnh chuẩn",
    desc: "Giữ độ tươi từ kho đến tay bạn, đặc biệt trái cây nhập khẩu.",
  },
  {
    emoji: "🔍",
    title: "Truy xuất nguồn gốc",
    desc: "Quét mã QR trên từng sản phẩm để xem vùng trồng & ngày thu hoạch.",
  },
  {
    emoji: "💚",
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
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-emerald-50 bg-emerald-50/30 p-6 text-center"
            >
              <span className="text-3xl">{f.emoji}</span>
              <h3 className="mt-3 font-semibold text-emerald-900">{f.title}</h3>
              <p className="mt-2 text-sm text-emerald-700/75">{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
