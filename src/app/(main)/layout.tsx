import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartProvider } from "@/providers/CartProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </CartProvider>
  );
}
