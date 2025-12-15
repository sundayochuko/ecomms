"use client";

import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSessionId } from "@/hooks/useSessionId";
import { useState, use } from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductPage = ({ params }: PageProps) => {
  const { id } = use(params);
  const productId = id as Id<"products">;
  const sessionId = useSessionId();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // API access
  const product = useQuery(api.frontend.products.getById, { productId });
  const addToCart = useMutation(api.frontend.cart.add);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart({
        productId,
        quantity,
        sessionId: sessionId || undefined,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add product to cart");
    } finally {
      setIsAdding(false);
    }
  };

  if (product === undefined) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center mt-[70px]">
        <div className="text-center">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center mt-[70px]">
        <div className="text-center">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  const imageUrl = product.imageUrl || (product.images && product.images[0]) || "/images/cart-grocery.jpg";
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen w-full flex items-center justify-center mt-[70px] py-10">
      <div className="w-[1100px] flex gap-10 items-start">
        <div className="h-[500px] w-[550px] border-2 border-gray-200 overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={product.name}
            width={600}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative h-full w-[550px] flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="mb-4">
            {hasDiscount ? (
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-greencolor">
                  €{product.price.toFixed(2)}
                </p>
                <p className="text-xl text-gray-500 line-through">
                  €{product.originalPrice!.toFixed(2)}
                </p>
                <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
                  {Math.round(
                    ((product.originalPrice! - product.price) /
                      product.originalPrice!) *
                      100
                  )}
                  % OFF
                </span>
              </div>
            ) : (
              <p className="text-3xl font-bold text-greencolor">
                €{product.price.toFixed(2)}
              </p>
            )}
            {product.unit && (
              <p className="text-sm text-gray-500 mt-1">per {product.unit}</p>
            )}
          </div>

          {product.description && (
            <p className="text-[17px] mb-6">{product.description}</p>
          )}

          {product.isLocal && (
            <div className="mb-4">
              <span className="bg-greencolor text-white px-3 py-1 rounded text-sm font-bold">
                Local Product
              </span>
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2">Quantity:</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 border-2 rounded flex items-center justify-center"
              >
                -
              </button>
              <span className="text-xl font-bold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 border-2 rounded flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="h-12 w-[300px] bg-greencolor text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
