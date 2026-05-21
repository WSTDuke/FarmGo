export const APP_NAME = "FarmGo";

export const ROUTES = {
  home: "/",
  about: "/about",
  products: "/products",
  account: "/account",
  settings: "/settings",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  authCallback: "/auth/callback",
} as const;

/** Chiều cao header (navbar x2) — dùng cho sticky offset */
export const HEADER_OFFSET_CLASS = "top-24 lg:top-28";

export const NAV_LINKS = [
  { href: ROUTES.home, label: "Trang chủ" },
  { href: ROUTES.about, label: "Giới thiệu" },
  { href: ROUTES.products, label: "Sản phẩm" },
] as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
