import Categories from "@/components/navbar/homepage/categories";
import Herosection from "@/components/navbar/homepage/Herosection";
import Promosection from "@/components/navbar/homepage/Promosection";

export default function Home() {
  return (
    <div className="h-full w-full mt-2.5 ">
      <Herosection />
      <Categories />
      <Promosection />
      <div className="h-[300px] w-full bg-cyan-700"></div>
    </div>
  );
}
