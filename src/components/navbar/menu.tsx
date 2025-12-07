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

type menuProps = {
  tooggleIsOpen: () => void;
};

const Menu = ({ tooggleIsOpen }: menuProps) => {
  const menu = [
    {
      icon: GiFarmer,
      label: "Local Products",
    },
    {
      icon: MdOutlineBakeryDining,
      label: "Bakery",
    },
    { icon: LuFlower2, label: "Fruits & Vegetables" },
    {
      icon: PiForkKnifeBold,
      label: "Meat & Fish",
    },
    {
      icon: BsCup,
      label: "Dairy & Eggs",
    },
    {
      icon: BiCheese,
      label: "Cheese & Cold cuts",
    },
    {
      icon: VscGift,
      label: "Snaccks & Sweets",
    },
    {
      icon: LiaGlassMartiniSolid,
      label: "Drinks & Beverages",
    },
    {
      icon: LuDog,
      label: "Pet Supplies",
    },
    {
      icon: LiaTagSolid,
      label: "Weekly Promotions",
    },
  ];
  return (
    <div className=" h-[650px] w-[280px] bg-background px-4 pt-2 border-r-2 border-gray-300 ">
      <div className="flex items-center  justify-between">
        <h1 className="text-[20px] font-bold ">Categories</h1>
        <button onClick={tooggleIsOpen}>
          <IoCloseSharp className="text-2xl" />
        </button>
      </div>

      <ul className="flex flex-col mt-7">
        {menu.map((m, index) => {
          return (
            <li key={index} className="mb-8">
              {m.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
