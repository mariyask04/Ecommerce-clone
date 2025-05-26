import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Your Store Name | Premium E-commerce",
  description: "Discover premium products with timeless style",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lora.variable} antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <NavbarWrapper />
          <main className="flex-grow pt-16 relative">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
