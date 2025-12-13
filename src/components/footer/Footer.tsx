import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-[250px] w-full  py-10 px-20 flex flex-col   bg-greencolor text-background">
      <div className="flex justify-between">
        <div>
          <h1 className="text-[18px] mb-4 font-bold">Store Locator</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Find a Store</p>
            <p className="text-[14px]">Opening Hours</p>
            <p className="text-[14px]">Store Services</p>
          </div>
        </div>
        <div>
          <h1 className="text-[18px] mb-4 font-bold">Customer Service</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Contact Us</p>
            <p className="text-[14px]">FAQ</p>
            <p className="text-[14px]">Help Center</p>
          </div>
        </div>
        <div>
          <h1 className="text-[18px] mb-4 font-bold">Policies</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Return Policy</p>
            <p className="text-[14px]">Privacy Policy</p>
            <p className="text-[14px]">Team of Service</p>
          </div>
        </div>
        <div>
          <h1 className="text-[18px] mb-4 font-bold">Cactus Card</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Loyalty Program</p>
            <p className="text-[14px]">Benefits</p>
            <p className="text-[14px]">Register Card</p>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-green-100 opacity-40 my-5"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="mr-1">Follow us: </h2>
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-500 opacity-100">
            <FaFacebookF />
          </div>
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-500 opacity-100 ">
            <IoLogoInstagram />
          </div>
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-500 opacity-100 ">
            <AiOutlineTikTok />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
