export const APP_NAME = "FarmGo";

export const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
] as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
