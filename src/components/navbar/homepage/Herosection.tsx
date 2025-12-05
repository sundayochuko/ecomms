import Image from "next/image";
import React from "react";

const Herosection = () => {
  return (
    <div className="h-[400px] w-full flex bg-linear-to-b from-green-300 via-white to-green-50">
      <div className="w-[60%] h-full  pl-10 pt-30">
        <h1 className="text-7xl font-medium">
          Fresh Produce & <br /> Local Products
        </h1>
        <p className="text-3xl my-2">
          Discover the best local products from our store
        </p>
        <button className="py-2 px-6  text-white rounded-full bg-greencolor cursor-pointer">
          Shop Now
        </button>
      </div>
      <div className="w-[40%] h-full">
        <Image
          src="/images/grocery-img 1.png"
          alt="/"
          width={600}
          height={200}
          className=" h-full w-full bg-cover bg-center mr-5 "
        />
      </div>
    </div>
  );
};

export default Herosection;
