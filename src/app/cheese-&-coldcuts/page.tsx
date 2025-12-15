"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/Ui/ProductCard";

const CheeseColdcutsPage = () => {
  const products = useQuery(api.frontend.products.getByCategory, {
    category: "cheese-&-coldcuts",
  });

  return (
    <div className="min-h-screen w-full px-5 mt-[90px] py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-greencolor mb-8">Cheese & Cold Cuts</h1>
        {products === undefined ? (
          <div className="text-center py-20">
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p>No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheeseColdcutsPage;
