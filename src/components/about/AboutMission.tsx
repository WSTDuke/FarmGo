import Image from "next/image";

export function AboutMission() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-emerald-100/80">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
            alt="Nông dân thu hoạch rau củ"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Sứ mệnh
          </p>
          <h2 className="mt-3 text-3xl font-bold text-emerald-950">
            Làm nông nghiệp minh bạch và bền vững hơn
          </h2>
          <p className="mt-4 text-base leading-relaxed text-emerald-800/80">
            FarmGo ra đời từ mong muốn mỗi bữa ăn Việt đều có nguồn gốc rõ ràng.
            Chúng tôi hợp tác trực tiếp với hợp tác xã, nông trại VietGAP và
            nhà vườn địa phương — không qua nhiều tầng trung gian.
          </p>
          <p className="mt-4 text-base leading-relaxed text-emerald-800/80">
            Mỗi sản phẩm đều có thông tin thu hoạch, vùng trồng và quy trình
            bảo quản. Bạn mua yên tâm, nông dân nhận giá công bằng hơn.
          </p>
        </div>
      </div>
    </section>
  );
}
