"use client";

import { IconBox } from "@/components/ui/IconBox";
import { Input } from "@/components/ui/Input";
import { Leaf } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="bg-gradient-to-b from-white to-emerald-50 py-16">
      <div className="mx-auto max-w-xl px-4 text-center lg:px-8">
        <IconBox icon={Leaf} size="lg" className="mx-auto" />
        <h2 className="mt-4 text-2xl font-bold text-emerald-950">
          Nhận ưu đãi mùa vụ mỗi tuần
        </h2>
        <p className="mt-2 text-emerald-700/70">
          Đăng ký email — gợi ý trái cây theo mùa & mã giảm giá độc quyền.
        </p>
        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="email@example.com"
            className="border-emerald-200 sm:max-w-xs"
            aria-label="Email đăng ký"
          />
          <button
            type="submit"
            className="rounded-full bg-emerald-600 px-8 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
}
