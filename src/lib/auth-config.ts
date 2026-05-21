export const AUTH_IMAGE =
  "https://images.unsplash.com/photo-1619566636858-adf3ef3cf0af?w=1200&q=85";

export const AUTH_HERO = {
  tagline: "Nông sản tươi mỗi ngày",
  title: "Từ nông trại",
  titleLine2: "đến bàn ăn của bạn",
} as const;

export type AuthVariant = "login" | "register" | "forgotPassword";

export const AUTH_COPY: Record<
  AuthVariant,
  {
    pageTitle: string;
    pageDescription: string;
    panelTitle: string;
    panelSubtitle: string;
    heroDescription: string;
    submitLabel: string;
    alternatePrompt: string;
    alternateHref: string;
    alternateLabel: string;
  }
> = {
  login: {
    pageTitle: "Đăng nhập",
    pageDescription: "Đăng nhập tài khoản FarmGo để mua nông sản tươi.",
    panelTitle: "Đăng nhập",
    panelSubtitle:
      "Chào mừng trở lại. Tiếp tục mua nông sản tươi mỗi ngày.",
    heroDescription:
      "Đăng nhập để theo dõi đơn hàng, nhận ưu đãi mùa vụ và mua sắm nhanh hơn.",
    submitLabel: "Đăng nhập",
    alternatePrompt: "Chưa có tài khoản?",
    alternateHref: "/register",
    alternateLabel: "Đăng ký ngay",
  },
  register: {
    pageTitle: "Đăng ký",
    pageDescription: "Tạo tài khoản FarmGo để mua nông sản tươi.",
    panelTitle: "Đăng ký",
    panelSubtitle:
      "Tạo tài khoản miễn phí — nhận ưu đãi cho thành viên mới.",
    heroDescription:
      "Tham gia để mua trái cây, rau củ sạch với giá minh bạch",
    submitLabel: "Tạo tài khoản",
    alternatePrompt: "Đã có tài khoản?",
    alternateHref: "/login",
    alternateLabel: "Đăng nhập",
  },
  forgotPassword: {
    pageTitle: "Quên mật khẩu",
    pageDescription: "Khôi phục mật khẩu tài khoản FarmGo qua email.",
    panelTitle: "Quên mật khẩu",
    panelSubtitle: "Nhập email đăng ký — chúng tôi gửi liên kết đặt lại mật khẩu.",
    heroDescription:
      "Liên kết trong email có hiệu lực giới hạn. Sau khi bấm link, bạn đặt mật khẩu mới ngay tại đây.",
    submitLabel: "Gửi email khôi phục",
    alternatePrompt: "Nhớ mật khẩu?",
    alternateHref: "/login",
    alternateLabel: "Đăng nhập",
  },
};

export const REGISTER_STEPS = [
  {
    title: "Thông tin cá nhân",
    description: "Nhập họ tên, số điện thoại và email của bạn.",
  },
  {
    title: "Bảo mật tài khoản",
    description: "Đặt mật khẩu và xác nhận điều khoản sử dụng.",
  },
] as const;
