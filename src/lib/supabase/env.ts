function normalizeSupabaseUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

export function getSupabaseEnv() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!rawUrl || !anonKey) {
    throw new Error(
      "Thiếu cấu hình Supabase. Sao chép .env.example → .env.local, điền NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY (Dashboard → Settings → API), rồi khởi động lại: npm run dev",
    );
  }

  return {
    url: normalizeSupabaseUrl(rawUrl),
    anonKey,
  };
}
