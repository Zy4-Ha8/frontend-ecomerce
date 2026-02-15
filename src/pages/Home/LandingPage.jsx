import land from "../../assets/images/landing.jpg";
const LandingPage = () => {
  return (
    <div className=" p-4 bg-[#fdfffe] w-full flex justify-between items-center flex-col sm:flex-row lg:h-[70vh]">
      {/* text section */}
      <div className=" lg:w-[50%] h-full flex flex-col justify-around gap-5 p-6 ">
        <div className="flex flex-col gap-5 text-center md:text-start ">
          <h1 className=" text-2xl md:text-4xl lg:text-6xl font-extrabold uppercase">
            Find Clothoes That match your style{" "}
          </h1>
          <p className="text-xs lg:text-lg text-gray-600">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div>
            <button className="bg-black text-xs w-full md:w-auto text-white rounded-2xl  px-6 py-3">
              Shop Now
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center md:justify-start text-center md:text-start justify-center flex-wrap gap-4 ">
          {[
            { number: "200", text: "international Brands" },
            { number: "2,000", text: "High quality Products" },
            { number: "30,000", text: "Happy customers" },
          ].map((item, index) => (
            <div className={`${index !== 2 && " sm:border-r border-black/20 "}pr-2`}>
              <p className=" text-lg  ">{item.number}+</p>
              <p className="text-xs text-gray-600 capitalize ">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[50%] h-full ">
        <img className="w-full h-full object-contain" src={land} alt="" />
      </div>
    </div>
  );
};
export default LandingPage;
