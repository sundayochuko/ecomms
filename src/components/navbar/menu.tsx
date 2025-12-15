import Link from "next/link";
import { GiFarmer } from "react-icons/gi";
import { MdOutlineBakeryDining } from "react-icons/md";
import { LuFlower2 } from "react-icons/lu";
import { PiForkKnifeBold } from "react-icons/pi";
import { BsCup, BsGrid3X3 } from "react-icons/bs";
import { BiCheese } from "react-icons/bi";
import { VscGift } from "react-icons/vsc";
import { LiaGlassMartiniSolid } from "react-icons/lia";
import { LuDog } from "react-icons/lu";
import { LiaTagSolid } from "react-icons/lia";
import { IoCloseSharp } from "react-icons/io5";
import { useGlobalContext } from "../context/globalContext";

const Menu = () => {
  const { onToggle } = useGlobalContext();
  const menu = [
    {
      icon: BsGrid3X3,
      href: "/products",
      label: "All Products",
    },
    {
      icon: GiFarmer,
      href: "/localproducts",
      label: "Local Products",
    },
    {
      icon: MdOutlineBakeryDining,
      href: "/bakery",
      label: "Bakery",
    },
    {
      icon: LuFlower2,
      href: "/fruits-&-vegetables",
      label: "Fruits & Vegetables",
    },
    {
      icon: PiForkKnifeBold,
      href: "/meat-&-fish",
      label: "Meat & Fish",
    },
    {
      icon: BsCup,
      href: "/dairy-&-eggs",
      label: "Dairy & Eggs",
    },
    {
      icon: BiCheese,
      href: "/cheese-&-coldcuts",
      label: "Cheese & Cold cuts",
    },
    {
      icon: VscGift,
      href: "/snacks-&-sweets",
      label: "Snacks & Sweets",
    },
    {
      icon: LiaGlassMartiniSolid,
      href: "/drinks-&-beverages",
      label: "Drinks & Beverages",
    },
    {
      icon: LuDog,
      href: "/pet-supplies",
      label: "Pet Supplies",
    },
    {
      icon: LiaTagSolid,
      href: "/weekly-promotions",
      label: "Weekly Promotions",
    },
  ];
  return (
    <div className="h-full w-[280px] sm:w-[320px] bg-white px-4 pt-6 border-r-2 border-gray-200 overflow-y-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => onToggle("close_categories")}
          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          aria-label="Close menu"
        >
          <IoCloseSharp className="text-2xl" />
        </button>
      </div>

      <ul className="flex flex-col gap-1">
        {menu.map((m, index) => {
          const Icon = m.icon;
          return (
            <Link
              key={index}
              href={m.href}
              onClick={() => onToggle("close_categories")}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-greencolor rounded-lg transition-all group"
            >
              <Icon className="text-xl text-gray-500 group-hover:text-greencolor transition-colors" />
              <span className="font-medium">{m.label}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
