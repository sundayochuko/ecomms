import { FaFire } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Promosection = () => {
  return (
    <div className=" mt-10 mx-10  ">
      <div className=" flex gap-30 h-[500px] w-full p-8   bg-orange-600 text-white rounded-2xl">
        <div className=" w-[60%]">
          <div className=" relative h-8 w-[200px] flex items-center  justify-center  gap-3   rounded-2xl overflow-hidden ">
            <FaFire />
            <span>Limited TIme Offer</span>
            <div className="absolute top-0  bg-white opacity-60 h-8 w-[200px] "></div>
          </div>

          <h1 className="text-6xl font-bold my-5">
            Weekly Deals <br />
            <span className="text-yellow-200">Up to 30% off</span>
          </h1>
          <p>
            Don't miss out on our handpicked weekly promotions, fresh deals
            every week on your favorite products. limited quantities available!
          </p>
          <button className="h-12 my-5 flex w-[210px]  items-center justify-center  gap-3 rounded-[10px]  bg-white  text-amber-700 font-bold">
            Shop Weekly Deals <FaArrowRight />
          </button>
          <div className="border-t-2 border-gray-50 opacity-30 w-full my-8"></div>
          <div className=" w-[480px] flex justify-between  ">
            <div>
              <h2 className="text-2xl font-bold">50+</h2>
              <p className="text-gray-300">Products on Sale</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">30%</h2>
              <p className="text-gray-300">Max Discount</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">7</h2>
              <p className="text-gray-300">Days Only</p>
            </div>
          </div>
        </div>

        <div className="w-[40%] bg-cyan-400"></div>
      </div>
    </div>
  );
};

export default Promosection;
