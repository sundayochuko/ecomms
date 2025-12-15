import Image from "next/image";
import Link from "next/link";
import React from "react";

const Herosection = () => {
  return (
    <div
      id="hero"
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-green-200 via-white to-green-50 px-4 py-10"
    >
      <div className="max-w-7xl w-full flex items-center gap-8">
        <div className="w-full md:w-[60%] flex flex-col justify-center pl-4 md:pl-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-4">
            Fresh Produce & <br /> Local Products
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl my-4 text-gray-700">
            Discover the best local products from our store
          </p>
          <Link href="/products">
            <button className="py-3 px-8 text-lg text-white rounded-full bg-greencolor cursor-pointer hover:bg-green-700 transition-all shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[40%] h-full flex items-center justify-center">
          <Image
            src="/images/grocery-img 1.png"
            alt="Fresh produce"
            width={600}
            height={400}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Herosection;
