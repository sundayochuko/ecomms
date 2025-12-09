import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";

const LocalproductSection = () => {
  return (
    <div className="h-full w-full   mt-30  flex flex-col items-center justify-center bg-green-50">
      <div className="flex flex-col items-center justify-center text-black">
        <h1 className="text-3xl font-bold text-greencolor">Local Products</h1>
        <p className="text-[20px]">Best selling local product </p>
      </div>

      {/* Cards */}
      <div className="h-full w-[1450px] flex items-center justify-center gap-3 mt-7 ">
        <div className="relative h-[300px] w-[300px] rounded-2xl overflow-hidden">
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
          <div className="absolute bottom-0 h-[95px] w-full p-3 bg-white text-black">
            <h3 className="font-bold">Beef</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[18px] font-bold text-greencolor">
                  &#8364;7.56
                </p>
                <span className="text-[13px] text-gray-500">
                  &#8364;17.98/kg
                </span>
              </div>
              <div className="rounded-[10px] h-9 w-9 flex items-center justify-center  bg-greencolor ">
                <FaCartPlus className="text-white text-[20px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] w-[300px] rounded-2xl overflow-hidden">
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
          <div className="absolute bottom-0 h-[95px] w-full p-3 bg-white text-black">
            <h3 className="font-bold">Beef</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[18px] font-bold text-greencolor">
                  &#8364;7.56
                </p>
                <span className="text-[13px] text-gray-500">
                  &#8364;17.98/kg
                </span>
              </div>
              <div className="rounded-[10px] h-9 w-9 flex items-center justify-center  bg-greencolor ">
                <FaCartPlus className="text-white text-[20px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] w-[300px] rounded-2xl overflow-hidden">
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
          <div className="absolute bottom-0 h-[95px] w-full p-3 bg-white text-black">
            <h3 className="font-bold">Beef</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[18px] font-bold text-greencolor">
                  &#8364;7.56
                </p>
                <span className="text-[13px] text-gray-500">
                  &#8364;17.98/kg
                </span>
              </div>
              <div className="rounded-[10px] h-9 w-9 flex items-center justify-center  bg-greencolor ">
                <FaCartPlus className="text-white text-[20px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] w-[300px] rounded-2xl overflow-hidden">
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
          <div className="absolute bottom-0 h-[95px] w-full p-3 bg-white text-black">
            <h3 className="font-bold">Beef</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[18px] font-bold text-greencolor">
                  &#8364;7.56
                </p>
                <span className="text-[13px] text-gray-500">
                  &#8364;17.98/kg
                </span>
              </div>
              <div className="rounded-[10px] h-9 w-9 flex items-center justify-center  bg-greencolor ">
                <FaCartPlus className="text-white text-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalproductSection;
