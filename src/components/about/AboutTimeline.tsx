const MILESTONES = [
  {
    year: "2022",
    title: "Khởi nghiệp",
    desc: "Bắt đầu tại Đà Lạt với 15 đối tác vườn rau và trái cây.",
  },
  {
    year: "2023",
    title: "Mở rộng TP.HCM",
    desc: "Ra mắt kho lạnh và giao trong 2 giờ cho khu nội thành.",
  },
  {
    year: "2024",
    title: "Truy xuất QR",
    desc: "Áp dụng mã QR trên toàn bộ sản phẩm tươi.",
  },
  {
    year: "2026",
    title: "FarmGo hôm nay",
    desc: "Phục vụ hàng chục nghìn đơn mỗi tháng trên cả nước.",
  },
];

export function AboutTimeline() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Hành trình
          </p>
          <h2 className="mt-3 text-3xl font-bold text-emerald-950">
            Phát triển cùng nông dân Việt
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((item) => (
            <li
              key={item.year}
              className="relative rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white p-6"
            >
              <span className="text-2xl font-bold text-emerald-600">
                {item.year}
              </span>
              <h3 className="mt-2 font-semibold text-emerald-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-emerald-700/75">{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
