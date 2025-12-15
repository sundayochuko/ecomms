import Image from "next/image";

const FarmerlabelSection = () => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-greencolor flex items-center justify-center mb-10">
          Vum Lëtzebuerger Bauer
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {/* label-1 */}
        <div className="h-[130px] w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all cursor-pointer">
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
        <div className="h-[130px] w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all cursor-pointer">
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
        <div className="h-[130px] w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all cursor-pointer">
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
        <div className="h-[130px] w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all cursor-pointer">
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
        <div className="h-[130px] w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all cursor-pointer">
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
        <div className="h-[130px] w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all cursor-pointer">
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
        <div className="h-[130px] w-[130px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all cursor-pointer">
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
    </div>
  );
};

export default FarmerlabelSection;
