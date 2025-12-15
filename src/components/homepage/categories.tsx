import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";

const Categories = () => {
  return (
    <div
      id="Categories"
      className="min-h-[80vh] w-full flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-greencolor">
          Shop by Categories
        </h1>
        <p className="text-[20px]">
          Explore our wide section of fresh product local specialties and
          everyday essentails
        </p>
      </div>
      {/* cards */}
      <div className="w-full max-w-7xl mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <Link href="/localproducts" className="relative h-[280px] w-full sm:w-[350px] md:w-[400px] rounded-2xl border-2 border-gray-400 hover:border-green-400 shadow-2xl shadow-gray-500 overflow-hidden cursor-pointer transition-all">
          <div className="h-full w-full relative">
            <Image
              src="/images/local-product.jpg"
              alt="Local Products"
              fill
              className="object-cover object-center transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="absolute bottom-0 h-20 w-full flex items-center justify-between px-8  bg-white">
            <div className="flex items-center gap-2">
              <div className=" flex justify-center items-center  bg-green-200 h-9 w-9 rounded-full">
                <GiFarmer className=" text-greencolor text-2xl" />
              </div>
              <h3 className="text-[18px] font-bold">Local Products</h3>
            </div>

            <FaArrowRight className="text-gray-400" />
          </div>
        </Link>
        <Link href="/fruits-&-vegetables" className="relative h-[280px] w-full sm:w-[350px] md:w-[400px] rounded-2xl border-2 border-gray-400 hover:border-green-400 shadow-2xl shadow-gray-500 overflow-hidden cursor-pointer transition-all">
          <div className="h-full w-full relative">
            <Image
              src="/images/fruit&vegetables.jpg"
              alt="Fruits and Vegetables"
              fill
              className="object-cover object-center transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="absolute bottom-0 h-20 w-full flex items-center justify-between px-8  bg-white">
            <div className="flex items-center gap-2">
              <div className=" flex justify-center items-center  bg-green-200 h-9 w-9 rounded-full">
                <GiFarmer className=" text-greencolor text-2xl" />
              </div>
              <h3 className="text-[18px] font-bold">Fruits and Vegetables</h3>
            </div>

            <FaArrowRight className="text-gray-400" />
          </div>
        </Link>
        <Link href="/bakery" className="relative h-[280px] w-full sm:w-[350px] md:w-[400px] rounded-2xl border-2 border-gray-400 hover:border-green-400 shadow-2xl shadow-gray-500 overflow-hidden cursor-pointer transition-all">
          <div className="h-full w-full relative">
            <Image
              src="/images/bakery.jpg"
              alt="Bakery"
              fill
              className="object-cover object-center transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="absolute bottom-0 h-20 w-full flex items-center justify-between px-8  bg-white">
            <div className="flex items-center gap-2">
              <div className=" flex justify-center items-center  bg-green-200 h-9 w-9 rounded-full">
                <GiFarmer className=" text-greencolor text-2xl" />
              </div>
              <h3 className="text-[18px] font-bold">Bakery</h3>
            </div>

            <FaArrowRight className="text-gray-400" />
          </div>
        </Link>
      </div>
      <div className="mt-7">
        <Link href="/products">
          <button className="flex items-center gap-4 bg-black text-white py-4 px-8 rounded-2xl hover:bg-gray-800 transition-all cursor-pointer">
            View All Categories
            <span>
              <FaArrowRight className="text-white" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
