import type { Product, ProductCategory } from "@/types/product";

export const CATEGORIES: {
  id: ProductCategory;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    id: "fruits",
    label: "Trái cây",
    emoji: "🍊",
    description: "Cam, táo, nho, dưa hấu tươi mỗi ngày",
  },
  {
    id: "vegetables",
    label: "Rau củ",
    emoji: "🥬",
    description: "Rau xanh, củ quả sạch từ nông trại",
  },
  {
    id: "food",
    label: "Thực phẩm",
    emoji: "🌾",
    description: "Gạo, mật ong, đặc sản vùng miền",
  },
  {
    id: "flowers",
    label: "Hoa tươi",
    emoji: "🌸",
    description: "Hoa cắt, bó hoa, quà tặng xinh xắn",
  },
  {
    id: "organic",
    label: "Hữu cơ",
    emoji: "🌿",
    description: "Chứng nhận organic, an toàn tuyệt đối",
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cam sành Cao Phong",
    price: 45000,
    unit: "kg",
    category: "fruits",
    image:
      "https://images.unsplash.com/photo-1547514700-eed6f6e2a4f4?w=600&q=80",
    badge: "Bán chạy",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dâu tây Đà Lạt",
    price: 120000,
    unit: "hộp",
    category: "fruits",
    image:
      "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=600&q=80",
    badge: "Mùa vụ",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Rau muống sạch",
    price: 15000,
    unit: "bó",
    category: "vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Cà chua bi",
    price: 35000,
    unit: "kg",
    category: "vegetables",
    image:
      "https://images.unsplash.com/photo-1592924357225-91a4daadcdee?w=600&q=80",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Xoài cát Hòa Lộc",
    price: 55000,
    unit: "kg",
    category: "fruits",
    image:
      "https://images.unsplash.com/photo-1559189330-6fee360ae880?w=600&q=80",
    badge: "Giảm 15%",
    rating: 4.9,
  },
  {
    id: "6",
    name: "Bó hoa hồng đỏ",
    price: 180000,
    unit: "bó",
    category: "flowers",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
    rating: 4.8,
  },
  {
    id: "7",
    name: "Mật ong rừng U Minh",
    price: 220000,
    unit: "chai",
    category: "food",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
    badge: "Đặc sản",
    rating: 5,
  },
  {
    id: "8",
    name: "Táo Envy New Zealand",
    price: 89000,
    unit: "kg",
    category: "fruits",
    image:
      "https://images.unsplash.com/photo-1560806887-1ce45bdbc865?w=600&q=80",
    rating: 4.7,
  },
];

export const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1610832958506-aa5636816b93?w=500&q=80",
    alt: "Trái cây tươi",
    className: "top-8 right-4 md:right-12",
  },
  {
    src: "https://images.unsplash.com/photo-1546095666-0f3ffb2eaa33?w=400&q=80",
    alt: "Rau củ xanh",
    className: "bottom-12 left-4 md:left-16",
  },
  {
    src: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80",
    alt: "Dâu tây",
    className: "top-1/2 right-1/4 -translate-y-1/2",
  },
];
