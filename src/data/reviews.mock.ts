export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
};

const DEFAULT_REVIEWS: ProductReview[] = [
  {
    id: "r1",
    author: "Nguyễn Thị H.",
    rating: 5,
    date: "2026-05-10",
    content: "Sản phẩm tươi, đóng gói cẩn thận. Giao đúng hẹn, sẽ mua lại.",
  },
  {
    id: "r2",
    author: "Trần Văn K.",
    rating: 4,
    date: "2026-05-05",
    content: "Chất lượng tốt, giá hợp lý. Chỉ mong thêm tùy chọn giao giờ cụ thể.",
  },
  {
    id: "r3",
    author: "Lê Minh P.",
    rating: 5,
    date: "2026-04-28",
    content: "Rất hài lòng, đúng như mô tả. Nhân viên tư vấn nhiệt tình.",
  },
  {
    id: "r4",
    author: "Phạm Thu A.",
    rating: 4,
    date: "2026-04-15",
    content: "Lần đầu mua qua FarmGo, trải nghiệm ổn. Sản phẩm sạch, thơm.",
  },
];

/** Đánh giá mẫu theo sản phẩm — sau nối Supabase */
export function getProductReviews(productId: string): ProductReview[] {
  return DEFAULT_REVIEWS.map((r, i) => ({
    ...r,
    id: `${productId}-${r.id}`,
    rating: i === 0 ? 5 : r.rating,
  }));
}

export function getReviewCount(productId: string) {
  return getProductReviews(productId).length + Math.abs(productId.charCodeAt(0) % 40);
}
