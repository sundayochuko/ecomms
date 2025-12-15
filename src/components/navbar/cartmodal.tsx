"use client";

import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { RiStore2Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { useGlobalContext } from "../context/globalContext";
import { useSessionId } from "@/hooks/useSessionId";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Cartmodal = () => {
  const {
    onToggle,
    showCart,
    dropdown,
    setShowCart,
    handleSelect,
    selectLocation,
    storeLocations,
  } = useGlobalContext();

  const sessionId = useSessionId();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = useQuery(api.frontend.cart.get, {
    sessionId: sessionId || undefined,
  });

  const totals = useQuery(api.frontend.cart.getTotal, {
    sessionId: sessionId || undefined,
  });

  const updateQuantity = useMutation(api.frontend.cart.updateQuantity);
  const removeFromCart = useMutation(api.frontend.cart.remove);
  const checkout = useMutation(api.frontend.cart.checkout);

  const handleQuantityChange = async (
    cartItemId: Id<"cartItems">,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      await removeFromCart({ cartItemId });
    } else {
      await updateQuantity({ cartItemId, quantity: newQuantity });
    }
  };

  const handleRemove = async (cartItemId: Id<"cartItems">) => {
    await removeFromCart({ cartItemId });
  };

  const handleCheckout = async () => {
    if (!selectLocation) {
      alert("Please select a pickup location");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await checkout({
        sessionId: sessionId || undefined,
        storeLocationId: selectLocation.name,
        customerEmail: "customer@example.com", // You can add a form for this
        customerName: "Guest", // You can add a form for this
      });
      router.push(`/order-confirmation/${result.orderId}`);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLocationSelect = (location: any) => {
    handleSelect(location);
    // Automatically close dropdown after selection
    if (dropdown) {
      onToggle("dropdown");
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full sm:w-[400px] z-50 bg-background overflow-y-auto shadow-2xl">
      {/* closeCartIcon */}
      <button
        onClick={() => onToggle("close_modal")}
        className="absolute top-2 left-3 z-10"
      >
        <IoCloseSharp className="text-2xl" />
      </button>
      <h1 className="text-2xl text-center mt-2">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 mt-4">
        {cartItems === undefined ? (
          <div className="text-center py-10">
            <p>Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => {
              const product = item.product;
              const imageUrl =
                product?.imageUrl ||
                (product?.images && product.images[0]) ||
                "/images/cart-grocery.jpg";
              return (
                <div
                  key={item._id}
                  className="flex gap-2 h-auto w-full p-2 bg-gray-100 rounded-lg"
                >
                  <div className="h-24 w-24 shrink-0">
                    <Image
                      src={imageUrl}
                      alt={product?.name || "Product"}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <h2 className="font-bold text-sm">{product?.name || "Product"}</h2>
                    <p className="text-greencolor font-bold">
                      €{product?.price ? product.price.toFixed(2) : "0.00"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="h-8 w-[110px] flex items-center justify-between p-2 rounded-[10px] border-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          className="text-2xl hover:bg-gray-200 rounded px-1"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className="text-2xl hover:bg-gray-200 rounded px-1"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item._id)}
                        className="hover:bg-red-100 p-1 rounded"
                      >
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="bg-white border-t-2 px-6 py-3 border-gray-300 sticky bottom-0">
        <div className="flex items-center gap-2 mb-2">
          <RiStore2Line />
          <p>Pick Up</p>
        </div>
        <div className="relative mt-2">
          {/* Selected Item Display */}
          <button
            onClick={() => onToggle("dropdown")}
            className="h-16 w-full flex items-center justify-between px-1.5 border-2 border-greencolor rounded-[10px] bg-green-100"
          >
            {selectLocation ? (
              <div className="text-start">
                <p className="text-[15px] font-bold">{selectLocation.name}</p>
                <p className="text-[13px]">{selectLocation.address}</p>
              </div>
            ) : (
              "Select location"
            )}
            {/* icons */}
            <div className="text-3xl text-gray-500">
              {dropdown ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </div>
          </button>
          {/* Dropdown Menu */}
          {dropdown && (
            <div className="absolute z-20 bottom-full mb-2 max-h-[200px] w-full flex flex-col overflow-y-auto cursor-pointer bg-background border-2 border-gray-200 rounded-lg shadow-lg">
              {storeLocations.map((location, index) => (
                <div
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className="p-2 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <strong className="text-sm">{location.name}</strong>
                  <p className="text-[13px] text-gray-600">{location.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-3 border-t-2 border-gray-300 text-[15px] pt-3">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>€{totals?.subtotal.toFixed(2) || "0.00"}</p>
          </div>
          <div className="flex justify-between">
            <p>Pickup Fee:</p>
            <p>{totals?.pickupFee === 0 ? "FREE" : `€${totals?.pickupFee.toFixed(2) || "0.00"}`}</p>
          </div>
        </div>
        <div className="flex justify-between border-t-2 border-gray-300 mt-2 text-[20px] pt-2">
          <p className="font-bold">Total:</p>
          <p className="font-bold">€{totals?.total.toFixed(2) || "0.00"}</p>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isProcessing || !cartItems || cartItems.length === 0 || !selectLocation}
          className="text-center bg-greencolor h-10 w-full text-white rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
        >
          {isProcessing ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cartmodal;
