import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="h-full w-full  flex items-center justify-center mt-[70px]">
      <div className="h-[500px] w-[1100px] flex gap-10  items-center">
        <div className="h-[300px] w-[550px] border-2 border-gray-200 overflow-hidden rounded-2xl">
          <Image
            src="/images/cart-grocery.jpg"
            alt="/"
            width={600}
            height={200}
            className="h-full w-full bg-cover bg-center"
          />
        </div>
        <div className="relative h-[300px] w-[550px] ">
          <h1 className="text-3xl">Title</h1>
          <p className="text-[15px] my-7">Price</p>
          <p className="text-[17px]">Descripton</p>
          <button className="absolute bottom-0 h-10 w-[300px] bg-greencolor text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
