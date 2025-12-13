"use client";

import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "./menu";
import Cartmodal from "./cartmodal";
import { useGlobalContext } from "../context/globalContext";
import Link from "next/link";

const Navbar = () => {
  const { onToggle, showCart, showMenu } = useGlobalContext();

  const handleSroll = (sectionid: string) => {
    const sections = document.getElementById(sectionid);
    if (sections) {
      sections.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 z-40 h-[70px] w-full flex flex-col bg-background shadow-2xl">
      {/* Top */}
      <div className="relative h-15 w-full flex items-center justify-between px-8 ">
        <Link href="/" className="h-10 w-35">
          <Image
            src="/cactus-logo.jpg"
            alt="/"
            width={600}
            height={200}
            className="h-full w-full bg-cover bg-center mr-5 "
          />
        </Link>
        <div>
          <input
            type="text"
            placeholder="search"
            className="w-[600px] h-9 px-5 text-black font-bold rounded-2xl  border-2 border-foreground outline-none"
          />
        </div>
        <div className=" flex gap-5">
          <div className="flex items-center">
            <MdAccountCircle className="text-3xl text-greencolor" />
            <p className=" text-greencolor">Log in</p>
          </div>
          <button onClick={() => onToggle("cart_modal")}>
            <PiShoppingCartLight className="text-3xl text-greencolor" />
          </button>
        </div>
        <div
          className={`absolute top-0 right-0 z-40   ${
            showCart ? "translate-x-0" : "translate-x-full"
          } `}
        >
          <Cartmodal />
        </div>
      </div>
      {/* bottom */}
      <div className="relative h-5 w-full flex  items-center justify-center  px-8 ">
        <ul className="flex gap-8 cursor-pointer">
          <Link href="/" onClick={() => handleSroll("hero")}>
            Home
          </Link>

          <li onClick={() => handleSroll("Categories")}>Categories</li>
          <li onClick={() => handleSroll("promotion")}>Weekly Deals</li>
          <li onClick={() => handleSroll("local-products")}>Local Products</li>
        </ul>

        <button
          onClick={() => onToggle("cartegories_modal")}
          className="absolute left-9 "
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>
        {/* Menu */}
        <div
          className={`
    fixed top-13 left-0 z-50
    h-screen  bg-white shadow-xl
    transition-transform duration-300
    ${showMenu ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
