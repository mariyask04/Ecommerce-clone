import CategoryList from "@/components/CategoryList";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="py-12">
        <FeaturedProducts />
      </div>
      <div className="py-12">
        <CategoryList />
      </div>
    </div>
  );
}
