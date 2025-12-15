"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa6";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSessionId } from "@/hooks/useSessionId";
import { useState } from "react";

type Product = {
  _id: Id<"products">;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  imageUrl?: string;
  images?: string[];
  isLocal?: boolean;
  unit?: string;
  description?: string;
};

type ProductCardProps = {
  product: Product;
  discount?: number;
};

const ProductCard = ({ product, discount }: ProductCardProps) => {
  const addToCart = useMutation(api.frontend.cart.add);
  const sessionId = useSessionId();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
        sessionId: sessionId || undefined,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const imageUrl = product.imageUrl || product.image || (product.images && product.images[0]) || "/images/cart-grocery.jpg";
  const displayPrice = product.price;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : discount;

  return (
    <Link href={`/product/${product._id}`}>
      <div className="relative h-80 w-[300px] rounded-2xl overflow-hidden border-2 border-gray-300 hover:shadow-2xl cursor-pointer">
        <Image
          src={imageUrl}
          alt={product.name}
          width={600}
          height={200}
          className="h-full w-full bg-cover bg-center object-cover"
        />
        {product.isLocal && (
          <div className="absolute top-2 left-3 rounded-[10px] h-6 w-11 flex items-center justify-center bg-greencolor">
            <span className="text-[11px] text-white font-bold">Local</span>
          </div>
        )}
        {discountPercent && discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-orange-600 rounded-full h-10 w-10 flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">-{discountPercent}%</span>
          </div>
        )}
        <div className="absolute bottom-0 h-[120px] w-full p-3 bg-white text-black">
          <h1 className="font-bold">{product.name}</h1>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <p className="text-[18px] font-bold text-greencolor">
                €{displayPrice.toFixed(2)}
              </p>
              {hasDiscount && (
                <span className="text-[13px] text-gray-500 line-through">
                  €{product.originalPrice!.toFixed(2)}
                </span>
              )}
              {product.unit && (
                <span className="text-[13px] text-gray-500">/ {product.unit}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="rounded-[10px] h-9 w-full flex items-center justify-center gap-2 text-white bg-greencolor hover:bg-green-700 disabled:opacity-50"
            >
              <FaCartPlus className="text-[20px]" />
              <h2>{isAdding ? "Adding..." : "Add To Cart"}</h2>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

