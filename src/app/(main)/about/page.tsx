import { AboutCta } from "@/components/about/AboutCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { WhyFarmGo } from "@/components/home/WhyFarmGo";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Giới thiệu — ${APP_NAME}`,
  description:
    "Tìm hiểu sứ mệnh FarmGo — kết nối nông sản tươi từ nông trại đến bàn ăn của bạn.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutTimeline />
      <WhyFarmGo />
      <AboutCta />
    </main>
  );
}
