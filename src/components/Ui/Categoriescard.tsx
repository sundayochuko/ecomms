import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";

const CategoriesCard = () => {
  return (
    <div className="relative h-80 w-[300px] rounded-2xl overflow-hidden border-2 border-gray-300 hover:shadow-2xl">
      <Image
        src="/images/cart-grocery.jpg"
        alt="/"
        width={600}
        height={200}
        className="h-full w-full bg-cover bg-center mr-5"
      />
      <div className="absolute top-2 left-3 rounded-[10px] h-6 w-11 flex items-center justify-center bg-greencolor">
        <span className="text-[11px] text-white font-bold">Local</span>
      </div>
      <div className="absolute bottom-0 h-[120px] w-full p-3 bg-white text-black">
        <h1 className="font-bold">Coffee Beans</h1>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <p className="text-[18px] font-bold text-greencolor">&#8364;7.56</p>
            <span className="text-[13px] text-gray-500">&#8364;17.98/kg</span>
          </div>
          <div className="rounded-[10px] h-9 w-full flex items-center justify-center gap-2 text-white   bg-greencolor ">
            <FaCartPlus className="text-[20px]" />
            <h2>Add To Cart</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
