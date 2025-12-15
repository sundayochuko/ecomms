"use client";

import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSessionId } from "@/hooks/useSessionId";
import Menu from "./menu";
import Cartmodal from "./cartmodal";
import { useGlobalContext } from "../context/globalContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const { onToggle, showCart, showMenu } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const sessionId = useSessionId();

  // Get cart items count
  const cartItems = useQuery(api.frontend.cart.get, {
    sessionId: sessionId || undefined,
  });
  const cartItemCount = cartItems?.length || 0;

  const handleSroll = (sectionid: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionid}`);
      return;
    }
    const sections = document.getElementById(sectionid);
    if (sections) {
      sections.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center flex-shrink-0">
            <Image
              src="/cactus-logo.jpg"
              alt="Cactus Logo"
              width={120}
              height={56}
              className="h-10 md:h-12 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 px-4 pr-10 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-greencolor focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-greencolor transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Account - Desktop */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-greencolor transition-colors"
            >
              <MdAccountCircle className="text-2xl md:text-3xl" />
              <span className="text-sm md:text-base font-medium">Log in</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => onToggle("cart_modal")}
              className="relative p-2 text-gray-700 hover:text-greencolor transition-colors"
              aria-label="Shopping cart"
            >
              <PiShoppingCartLight className="text-2xl md:text-3xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-greencolor text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>

            {/* Categories Menu Button */}
            <button
              onClick={() => onToggle("cartegories_modal")}
              className="p-2 text-gray-700 hover:text-greencolor transition-colors"
              aria-label="Categories Menu"
            >
              <GiHamburgerMenu className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center justify-center border-t border-gray-200 h-12">
          <ul className="flex items-center gap-6 lg:gap-8">
            <li>
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    handleSroll("hero");
                  }
                }}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/") && pathname === "/"
                    ? "text-greencolor border-b-2 border-greencolor"
                    : "text-gray-700 hover:text-greencolor"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleSroll("Categories")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/" ? "text-gray-700 hover:text-greencolor" : "text-gray-700 hover:text-greencolor"
                }`}
              >
                Categories
              </button>
            </li>
            <li>
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    handleSroll("promotion");
                  }
                }}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "text-gray-700 hover:text-greencolor"
                    : "text-gray-700 hover:text-greencolor"
                }`}
              >
                Weekly Deals
              </Link>
            </li>
            <li>
              <Link
                href="/localproducts"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/localproducts")
                    ? "text-greencolor border-b-2 border-greencolor"
                    : "text-gray-700 hover:text-greencolor"
                }`}
              >
                Local Products
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/products")
                    ? "text-greencolor border-b-2 border-greencolor"
                    : "text-gray-700 hover:text-greencolor"
                }`}
              >
                All Products
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-gray-200 px-4 py-2">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-4 pr-10 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-greencolor focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Cart Modal Overlay */}
      {showCart && (
        <div
          className="fixed inset-0 z-40 bg-transparent transition-opacity duration-300"
          onClick={() => onToggle("close_modal")}
        />
      )}

      {/* Cart Modal */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen transition-transform duration-300 ease-in-out ${
          showCart ? "translate-x-0" : "translate-x-full"
        } shadow-2xl`}
      >
        <Cartmodal />
      </div>

      {/* Side Menu */}
      <div
        className={`
          fixed top-0 left-0 z-50
          h-screen bg-white shadow-xl
          transition-transform duration-300 ease-in-out
          ${showMenu ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Menu />
      </div>

      {/* Overlay for mobile menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40 bg-transparent md:hidden"
          onClick={() => onToggle("close_categories")}
        />
      )}
    </nav>
  );
};

export default Navbar;
