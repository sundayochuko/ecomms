"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { use } from "react";
import Link from "next/link";
import { FaCheckCircle, FaBox, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

type PageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

const OrderConfirmationPage = ({ params }: PageProps) => {
  const { orderId } = use(params);
  const order = useQuery(api.frontend.orders.getByOrderId, { orderId });
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Trigger animation on mount
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (order === undefined) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center mt-[90px] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greencolor mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center mt-[90px] px-4">
        <div className="text-center max-w-md">
          <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find an order with that ID.</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-greencolor text-white rounded-lg hover:bg-green-700 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 mt-[90px] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div
          className={`text-center mb-8 transition-all duration-1000 ${
            isAnimating
              ? "scale-110 opacity-100"
              : "scale-100 opacity-100"
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4 transition-all duration-500 ${
              isAnimating ? "scale-0 animate-[bounce_0.6s_ease-in-out]" : "scale-100"
            }`}
            style={{
              animation: isAnimating ? "bounce 0.6s ease-in-out" : "none",
            }}
          >
            <FaCheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold text-gray-800 mb-2 transition-all duration-700 ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
            style={{
              transitionDelay: isAnimating ? "0.3s" : "0s",
            }}
          >
            Order Confirmed!
          </h1>
          <p
            className={`text-lg text-gray-600 transition-all duration-700 ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
            style={{
              transitionDelay: isAnimating ? "0.5s" : "0s",
            }}
          >
            Thank you for your purchase. We've received your order.
          </p>
        </div>

        {/* Order Details Card */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 transition-all duration-700 ${
            isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: isAnimating ? "0.7s" : "0s",
          }}
        >
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-lg font-mono font-semibold text-greencolor">{order.orderId}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaBox className="w-5 h-5 text-gray-400" />
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "ready"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100"
                  style={{
                    animation: isAnimating
                      ? `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product?.name || "Product"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>€{order.subtotal?.toFixed(2) || "0.00"}</span>
              </div>
              {order.pickupFee !== undefined && order.pickupFee > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Pickup Fee</span>
                  <span>€{order.pickupFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span className="text-greencolor">€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Information */}
        {order.storeLocationId && (
          <div
            className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 transition-all duration-700 ${
              isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            }`}
            style={{
              transitionDelay: isAnimating ? "0.9s" : "0s",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaMapMarkerAlt className="w-6 h-6 text-greencolor" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pickup Location</h3>
                <p className="text-gray-700">{order.storeLocationId}</p>
                <p className="text-sm text-gray-600 mt-2">
                  We'll notify you when your order is ready for pickup.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Date */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 transition-all duration-700 ${
            isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: isAnimating ? "1.1s" : "0s",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCalendarAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Order Date</h3>
              <p className="text-gray-700">{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
            isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: isAnimating ? "1.3s" : "0s",
          }}
        >
          <Link
            href="/products"
            className="flex-1 text-center px-6 py-3 bg-greencolor text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 text-center px-6 py-3 bg-white text-gray-800 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmationPage;

