import type { Post } from "@/types/post";

export const mockPosts: Post[] = [
  {
    slug: "chao-mung-farmgo",
    title: "Chào mừng đến FarmGo",
    excerpt: "Bài viết mock đầu tiên cho scaffold dự án.",
    content:
      "Đây là nội dung mock. Khi có API thật, thay bằng dữ liệu từ services.",
    publishedAt: "2026-05-21",
  },
  {
    slug: "huong-dan-cau-truc",
    title: "Hướng dẫn cấu trúc thư mục",
    excerpt: "Tổ chức components, lib, hooks và services.",
    content:
      "src/components cho UI, src/lib cho tiện ích, src/services cho logic nghiệp vụ.",
    publishedAt: "2026-05-20",
  },
  {
    slug: "api-hello-mock",
    title: "API hello mock",
    excerpt: "Thử GET /api/hello để xem response JSON.",
    content: "Route handler nằm tại src/app/api/hello/route.ts.",
    publishedAt: "2026-05-19",
  },
];
