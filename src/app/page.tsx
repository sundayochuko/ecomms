import Categories from "@/components/homepage/categories";
import FarmerlabelSection from "@/components/homepage/FarmerlabelSection";
import Herosection from "@/components/homepage/Herosection";
import LocalproductSection from "@/components/homepage/localproductSection";
import Promosection from "@/components/homepage/Promosection";

export default function Home() {
  return (
    <div className="h-full w-full pt-16 md:pt-20">
      <Herosection />
      <Categories />
      <Promosection />
      <LocalproductSection />
      <FarmerlabelSection />
    </div>
  );
}
