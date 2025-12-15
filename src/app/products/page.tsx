"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/Ui/ProductCard";

const ProductsPage = () => {
  // Get all active products
  const products = useQuery(api.frontend.products.list, {});

  return (
    <div className="min-h-screen w-full px-5 mt-[90px] py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-greencolor mb-2">All Products</h1>
          <p className="text-gray-600">
            Browse our complete collection of products
          </p>
        </div>

        {products === undefined ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600 mb-2">No products available</p>
            <p className="text-sm text-gray-500">
              Check back soon for new products!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{products.length}</span>{" "}
                {products.length === 1 ? "product" : "products"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

