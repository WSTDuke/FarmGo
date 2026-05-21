const STATS = [
  { value: "500+", label: "Loại nông sản" },
  { value: "120+", label: "Đối tác nông trại" },
  { value: "2h", label: "Giao hàng nội thành" },
  { value: "98%", label: "Khách hài lòng" },
];

export function AboutStats() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50/60 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-emerald-700 md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-emerald-800/70 md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
