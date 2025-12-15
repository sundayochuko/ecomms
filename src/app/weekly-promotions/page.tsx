"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/Ui/ProductCard";

const WeeklyPromotionsPage = () => {
  const saleProducts = useQuery(api.frontend.promotions.getProductsOnSale, {});
  const promoStats = useQuery(api.frontend.promotions.getStats);

  return (
    <div className="min-h-screen w-full px-5 mt-[90px] py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-greencolor mb-2">Weekly Promotions</h1>
          {promoStats && (
            <p className="text-gray-600">
              {promoStats.totalProductsOnSale} products on sale • Up to {promoStats.maxDiscount}% off • {promoStats.daysRemaining} days remaining
            </p>
          )}
        </div>
        {saleProducts === undefined ? (
          <div className="text-center py-20">
            <p>Loading promotions...</p>
          </div>
        ) : saleProducts.length === 0 ? (
          <div className="text-center py-20">
            <p>No products on sale at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => {
              const discount =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  discount={discount}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPromotionsPage;
