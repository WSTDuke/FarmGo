export function mapAuthError(message: string): string {
  const m = message.toLowerCase();

  if (m.includes("invalid login credentials")) {
    return "Email hoặc mật khẩu không đúng.";
  }
  if (m.includes("user already registered")) {
    return "Email này đã được đăng ký.";
  }
  if (m.includes("password") && m.includes("least")) {
    return "Mật khẩu quá ngắn (tối thiểu 6 ký tự).";
  }
  if (m.includes("email not confirmed")) {
    return "Vui lòng xác nhận email trước khi đăng nhập.";
  }
  if (m.includes("rate limit")) {
    return "Thử lại sau vài phút.";
  }
  if (m.includes("anonymous_provider_disabled")) {
    return "Thiếu email hoặc mật khẩu. Vui lòng điền đầy đủ các bước đăng ký.";
  }
  if (m.includes("auth session missing") || m.includes("session not found")) {
    return "Liên kết đã hết hạn. Vui lòng yêu cầu gửi email khôi phục lại.";
  }
  if (m.includes("user not found")) {
    return "Không tìm thấy tài khoản với email này.";
  }

  return message || "Có lỗi xảy ra. Vui lòng thử lại.";
}
