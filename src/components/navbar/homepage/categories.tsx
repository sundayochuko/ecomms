import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <div className="h-[400px] w-full flex flex-col items-center mt-30 ">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-greencolor">
          Shop by Categories
        </h1>
        <p className="text-[20px]">
          Explore our wide section of fresh product local specialties and
          everyday essentails
        </p>
      </div>
      <div className="h-[300px] w-[1400px] mt-5">
        <div className="relative h-full w-[500px] rounded-2xl border-2 border-gray-400 hover:border-green-400 shadow-2xl shadow-gray-500  overflow-hidden">
          <div className="h-[300px]">
            <Image
              src="/images/cart-grocery.jpg"
              alt="/"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5 transition-transform duration-300 hover:scale-110"
            />
          </div>
          {/* <div className="absolute top-0 h-[300px] w-full bg-black opacity-40 "></div> */}
          <div className=" absolute bottom-0 h-[100px] w-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
