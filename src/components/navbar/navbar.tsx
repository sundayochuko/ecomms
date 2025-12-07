"use client";

import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "./menu";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tooggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 z-50 h-[70px] w-full flex flex-col bg-background">
      {/* Top */}
      <div className="h-15 w-full flex items-center justify-between px-8">
        <Image
          src="/cactus-logo.jpg"
          alt="/"
          width={600}
          height={200}
          className=" h-10 w-35 bg-cover bg-center mr-5 "
        />
        <div>
          <input
            type="text"
            placeholder="search"
            className="w-[800px] h-9 px-5 text-black font-bold rounded-2xl  border-2 border-foreground outline-none"
          />
        </div>
        <div className="flex gap-5">
          <div className="flex items-center">
            <MdAccountCircle className="text-3xl text-greencolor" />
            <p className=" text-greencolor">Log in</p>
          </div>
          <div>
            <PiShoppingCartLight className="text-3xl text-greencolor" />
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="relative h-5 w-full flex items-center justify-center px-8  ">
        <ul className="flex gap-8 ">
          <li>Home</li>
          <li>Shop</li>
          <li>Categories</li>
          <li>Weekly Deals</li>
          <li>Local Products</li>
        </ul>

        <div className="absolute left-9 ">
          <GiHamburgerMenu className="text-2xl" />
        </div>
        {/* Menu */}
        <div className="fixed top-13 left-0 z-50 hidden ">
          <Menu tooggleIsOpen={tooggleIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
