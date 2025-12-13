"use client";

import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { RiStore2Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { useGlobalContext } from "../context/globalContext";

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

  return (
    <div className="relative flex flex-col h-[700px] w-[400px] z-50 bg-background overflow-hidden ">
      {/* closeCartIcon */}
      <button
        onClick={() => onToggle("close_modal")}
        className="absolute top-2 left-3"
      >
        <IoCloseSharp className="text-2xl" />
      </button>
      <h1 className="text-2xl text-center mt-2">Shopping Cart</h1>
      <div className="h-full w-full flex  justify-center mt-8 ">
        <div className="flex gap-2 h-30 w-[350px] p-2 bg-gray-100">
          <div className="h-24 w-30 ">
            <Image
              src="/images/cart-grocery.jpg"
              alt="/"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center"
            />
          </div>
          <div className=" h-24 w-40 flex  flex-col justify-between">
            <h2>Beef</h2>
            <p>&#8364;7.56</p>

            <div className="flex items-center justify-between ">
              <div className=" h-8 w-[110px] flex items-center justify-between p-2  rounded-[10px]  border-2 ">
                <span className="text-2xl">-</span>
                <span>1</span>
                <span className="text-2xl">+</span>
              </div>

              <MdOutlineDelete className="text-2xl text-red-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-[600px] w-full  border-t-2 px-6 py-3  border-gray-300">
        <div className=" flex items-center gap-2 ">
          <RiStore2Line />
          <p>Pick Up</p>
        </div>
        <div className="rleative  mt-2">
          {/* Selected Item Display */}
          <button
            onClick={() => onToggle("dropdown")}
            className=" h-16 w-full flex items-center justify-between px-1.5 border-2 border-greencolor rounded-[10px]  bg-green-100"
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
            <div className="absolute z-20 h-[200px] w-[350px] flex flex-col overflow-y-scroll cursor-pointer  mt-3 pb-5 bg-background">
              {storeLocations.map((location, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(location)}
                  className="p-2"
                >
                  <strong> {location.name}</strong>
                  <p className="text-[13px]">{location.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-3 border-t-2 border-gray-300 text-[15px]">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>&#8364;29.77</p>
          </div>
          <div className="flex justify-between">
            <p>Pickup Fee:</p>
            <p>FREE</p>
          </div>
        </div>
        <div className="flex justify-between  border-t-2 border-gray-300 mt-2 text-[20px]">
          <p className="font-bold ">Total:</p>
          <p>&#8364;29.77</p>
        </div>
        <button className="text-center bg-greencolor h-10 w-full text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cartmodal;
