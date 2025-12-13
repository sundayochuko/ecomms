import Image from "next/image";

const FarmerlabelSection = () => {
  return (
    <div className="h-full mx-10  my-30">
      <h1 className="text-2xl font-bold text-greencolor flex items-center justify-center">
        Vum Lëtzebuerger Bauer
      </h1>
      <div className="h-[130px] w-full mt-10 flex justify-between ">
        {/* lable-1 */}
        <div className="h-full w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl ">
          <div className="bg-background h-[100] w-[100]">
            <Image
              src="/labels/label-1.jpg"
              alt="label"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5"
            />
          </div>
        </div>
        {/* label-2 */}
        <div className="h-full w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl ">
          <div className="bg-background h-[100] w-[100]">
            <Image
              src="/labels/label-2.jpg"
              alt="label"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5"
            />
          </div>
        </div>
        {/* label-3 */}
        <div className="h-full w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl ">
          <div className="bg-background h-[100] w-[100]">
            <Image
              src="/labels/label-3.jpg"
              alt="label"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5"
            />
          </div>
        </div>
        {/* label-4 */}
        <div className="h-full w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl ">
          <div className="bg-background h-[100] w-[100]">
            <Image
              src="/labels/label-4.jpg"
              alt="label"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5"
            />
          </div>
        </div>
        {/* label-5 */}
        <div className="h-full w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl ">
          <div className="bg-background h-[100] w-[100]">
            <Image
              src="/labels/label-5.jpg"
              alt="label"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5"
            />
          </div>
        </div>
        {/* label-6 */}
        <div className="h-full w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl ">
          <div className="bg-background h-[100] w-[100]">
            <Image
              src="/labels/label-6.jpg"
              alt="label"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5"
            />
          </div>
        </div>
        {/* label-7 */}
        <div className="h-full w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl ">
          <div className="bg-background h-[100] w-[100]">
            <Image
              src="/labels/label-7.jpg"
              alt="label"
              width={600}
              height={200}
              className="h-full w-full bg-cover bg-center mr-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerlabelSection;
