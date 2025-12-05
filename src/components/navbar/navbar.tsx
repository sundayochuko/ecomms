import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className="h-[70px] w-full flex flex-col ">
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
      <div className="h-5 w-full flex items-center justify-center px-8 ">
        <ul className="flex gap-8 ">
          <li>Home</li>
          <li>Shop</li>
          <li>Categories</li>
          <li>Weekly Deals</li>
          <li>Local Products</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
