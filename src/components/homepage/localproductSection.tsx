"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/Ui/ProductCard";

const LocalproductSection = () => {
  const localProducts = useQuery(api.frontend.products.getLocal);

  return (
    <div
      id="local-products"
      className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-green-50 py-16 px-4"
    >
      <div className="flex flex-col items-center justify-center text-black">
        <h1 className="text-3xl font-bold text-greencolor">Local Products</h1>
        <p className="text-[20px]">Best selling local product</p>
      </div>

      {/* Cards */}
      {localProducts === undefined ? (
        <div className="w-full max-w-7xl flex items-center justify-center gap-3 mt-7">
          <p className="text-gray-600">Loading local products...</p>
        </div>
      ) : localProducts.length === 0 ? (
        <div className="w-full max-w-7xl flex items-center justify-center gap-3 mt-7">
          <p className="text-gray-600">No local products available</p>
        </div>
      ) : (
        <div className="w-full max-w-7xl flex items-center justify-center gap-4 md:gap-6 mt-7 flex-wrap">
          {localProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocalproductSection;
