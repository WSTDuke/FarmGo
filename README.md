# FarmGo

Website bán nông sản — trái cây, rau củ, thực phẩm và hoa tươi.

## Yêu cầu

- Node.js 20+
- npm

## Cài đặt

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy development |
| `npm run build` | Build production |
| `npm run start` | Chạy bản build |
| `npm run lint` | Kiểm tra ESLint |

## Cấu trúc

```
src/
├── app/          # Routes (Next.js App Router)
├── components/   # UI & layout
├── data/         # Mock data
├── hooks/
├── lib/
├── services/
├── styles/
└── types/
```

## Push lên GitHub

**Được commit:** mã nguồn (`src/`), `public/`, config (`package.json`, `tsconfig.json`, …), `.env.example`, `README.md`.

**Không commit:** `node_modules/`, `.next/`, `.env.local`, file build/cache (xem `.gitignore`).

```bash
git add .
git status   # kiểm tra không có .env.local / node_modules
git commit -m "Initial FarmGo project"
git remote add origin https://github.com/<user>/FarmGo.git
git push -u origin main
```
