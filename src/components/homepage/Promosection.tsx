"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FaFire } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import ProductCard from "@/components/Ui/ProductCard";

const Promosection = () => {
  const promoStats = useQuery(api.frontend.promotions.getStats);
  const saleProducts = useQuery(api.frontend.promotions.getProductsOnSale, {
    limit: 2,
  });

  const maxDiscount = promoStats?.maxDiscount || 30;
  const totalProducts = promoStats?.totalProductsOnSale || 50;
  const daysRemaining = promoStats?.daysRemaining || 7;

  return (
    <div
      id="promotion"
      className="min-h-[80vh] w-full flex items-center justify-center py-16 px-4"
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 p-6 md:p-8 bg-orange-600 text-white rounded-2xl shadow-2xl shadow-gray-500">
        <div className="w-full md:w-[60%] flex flex-col justify-center">
          <div className="relative h-8 w-full max-w-[200px] flex items-center justify-center gap-3 rounded-2xl overflow-hidden">
            <FaFire />
            <span>Limited Time Offer</span>
            <div className="absolute top-0 bg-white opacity-60 h-8 w-full"></div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold my-5">
            Weekly Deals <br />
            <span className="text-yellow-200">Up to {maxDiscount}% off</span>
          </h1>
          <p className="text-sm md:text-base">
            Don't miss out on our handpicked weekly promotions, fresh deals
            every week on your favorite products. limited quantities available!
          </p>
          <Link href="/weekly-promotions">
            <button className="h-12 my-5 flex w-full max-w-[210px] items-center justify-center gap-3 rounded-[10px] bg-white text-amber-700 font-bold">
              Shop Weekly Deals <FaArrowRight />
            </button>
          </Link>
          <div className="border-t-2 border-gray-50 opacity-30 w-full my-8"></div>
          <div className="w-full max-w-[480px] flex flex-wrap justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{totalProducts}+</h2>
              <p className="text-gray-300">Products on Sale</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{maxDiscount}%</h2>
              <p className="text-gray-300">Max Discount</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{daysRemaining}</h2>
              <p className="text-gray-300">Days Only</p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="w-full md:w-[40%] flex items-center justify-center gap-4 md:gap-5 flex-wrap">
          {saleProducts === undefined ? (
            <div className="text-white">Loading...</div>
          ) : saleProducts.length === 0 ? (
            <div className="text-white">No products on sale</div>
          ) : (
            saleProducts.slice(0, 2).map((product) => {
              const discount =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;
              return (
                <div key={product._id} className="scale-75">
                  <ProductCard product={product} discount={discount} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Promosection;
