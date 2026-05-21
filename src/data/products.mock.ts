import type { Product, ProductCategory } from "@/types/product";

export const CATEGORIES: {
  id: ProductCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "fruits",
    label: "Trái cây",
    description: "Cam, táo, nho, dưa hấu tươi mỗi ngày",
  },
  {
    id: "vegetables",
    label: "Rau củ",
    description: "Rau xanh, củ quả sạch từ nông trại",
  },
  {
    id: "food",
    label: "Thực phẩm",
    description: "Gạo, mật ong, đặc sản vùng miền",
  },
  {
    id: "flowers",
    label: "Hoa tươi",
    description: "Hoa cắt, bó hoa, quà tặng xinh xắn",
  },
  {
    id: "organic",
    label: "Hữu cơ",
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
  {
    id: "9",
    name: "Nho xanh không hạt",
    price: 95000,
    unit: "kg",
    category: "fruits",
    image:
      "https://images.unsplash.com/photo-1537640538966-79f521a9baf0?w=600&q=80",
    rating: 4.6,
  },
  {
    id: "10",
    name: "Dưa hấu ruột đỏ",
    price: 18000,
    unit: "kg",
    category: "fruits",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
    rating: 4.5,
  },
  {
    id: "11",
    name: "Bắp cải trắng",
    price: 22000,
    unit: "kg",
    category: "vegetables",
    image:
      "https://images.unsplash.com/photo-1594282418429-26355d4f57f4?w=600&q=80",
    rating: 4.4,
  },
  {
    id: "12",
    name: "Khoai lang Nhật",
    price: 28000,
    unit: "kg",
    category: "vegetables",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80",
    rating: 4.7,
  },
  {
    id: "13",
    name: "Ớt chuông mix",
    price: 42000,
    unit: "kg",
    category: "vegetables",
    image:
      "https://images.unsplash.com/photo-1563565375-3a6b0e169d16?w=600&q=80",
    badge: "Mới",
    rating: 4.5,
  },
  {
    id: "14",
    name: "Gạo ST25 túi 5kg",
    price: 145000,
    unit: "túi",
    category: "food",
    image:
      "https://images.unsplash.com/photo-1586201375767-83865001e31c?w=600&q=80",
    badge: "Bán chạy",
    rating: 4.9,
  },
  {
    id: "15",
    name: "Muối hồng Himalaya",
    price: 65000,
    unit: "hũ",
    category: "food",
    image:
      "https://images.unsplash.com/photo-1609501676725-718820abf966?w=600&q=80",
    rating: 4.6,
  },
  {
    id: "16",
    name: "Bánh đa nem Hà Nội",
    price: 38000,
    unit: "gói",
    category: "food",
    image:
      "https://images.unsplash.com/photo-1604908176997-431f63827d9f?w=600&q=80",
    rating: 4.4,
  },
  {
    id: "17",
    name: "Hoa cúc họa mi",
    price: 75000,
    unit: "bó",
    category: "flowers",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
    rating: 4.7,
  },
  {
    id: "18",
    name: "Hoa ly trắng",
    price: 220000,
    unit: "bó",
    category: "flowers",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80",
    badge: "Cao cấp",
    rating: 4.9,
  },
  {
    id: "19",
    name: "Rau rocket hữu cơ",
    price: 32000,
    unit: "bó",
    category: "organic",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    badge: "Organic",
    rating: 4.8,
  },
  {
    id: "20",
    name: "Cà rốt baby organic",
    price: 48000,
    unit: "kg",
    category: "organic",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a947da?w=600&q=80",
    badge: "Organic",
    rating: 4.7,
  },
  {
    id: "21",
    name: "Táo organic Fuji",
    price: 125000,
    unit: "kg",
    category: "organic",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80",
    rating: 4.9,
  },
  {
    id: "22",
    name: "Combo trái cây mix",
    price: 199000,
    unit: "hộp",
    category: "fruits",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80",
    badge: "Combo",
    rating: 4.8,
  },
];

/** Toàn bộ sản phẩm catalog (mở rộng từ featured) */
export const ALL_PRODUCTS: Product[] = FEATURED_PRODUCTS;

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
