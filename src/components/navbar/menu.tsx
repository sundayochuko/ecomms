import { GiFarmer } from "react-icons/gi";
import { MdOutlineBakeryDining } from "react-icons/md";
import { LuFlower2 } from "react-icons/lu";
import { PiForkKnifeBold } from "react-icons/pi";
import { BsCup } from "react-icons/bs";
import { BiCheese } from "react-icons/bi";
import { VscGift } from "react-icons/vsc";
import { LiaGlassMartiniSolid } from "react-icons/lia";
import { LuDog } from "react-icons/lu";
import { LiaTagSolid } from "react-icons/lia";
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from "react";
import { useGlobalContext } from "../context/globalContext";

const Menu = () => {
  const { onToggle } = useGlobalContext();
  const menu = [
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
    <div
      className={`h-[650px] w-[280px] bg-background px-4 pt-2 border-r-2 border-gray-300 `}
    >
      <div className="flex items-center  justify-between">
        <h1 className="text-[20px] font-bold ">Categories</h1>
        <button onClick={() => onToggle("close_categories")}>
          <IoCloseSharp className="text-2xl" />
        </button>
      </div>

      <ul className="flex flex-col mt-7">
        {menu.map((m, index) => {
          return (
            <a key={index} href={m.href} className="mb-8">
              {m.label}
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
