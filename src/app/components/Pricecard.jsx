const Pricecard = () => {
  const slides = [
    {
      tier: "SILVER",
      workingdays: "10 working days",
      description:
        "This plan grants access to all the facilities offered by us, the best plan for long-term clients.",
      price: "₹3,100",
    },
    {
      tier: "GOLD",
      workingdays: "7 working days",
      description:
        "This plan grants access to all the facilities offered by us, the best plan for long-term clients.",
      price: "₹5,100",
    },
    {
      tier: "DIAMOND",
      workingdays: "4 working days",
      description:
        "This plan grants access to all the facilities offered by us, the best plan for long-term clients.",
      price: "₹11,100",
    },
  ];

  return (
    <div className="bodie w-screen" style={{ fontFamily: "Sofia Pro Regular" }}>
      <div className="mb-[35px] ml-10 md:ml-44">
        <h1 className="text-[48px] mb-[10px] font-bold md:text-[40px] lg:text-[48px]">
          Pricing
        </h1>
        <p className="text-[12px] font-light md:text-[20px] lg:text-[24px]">
          Payment should be done before the work starts. <br />
        </p>
      </div>
      <div>
        <div className="flex flex-wrap justify-center gap-4">
          {slides.map((slide) => (
            <div
              key={slide.tier}
              className="border-4 border-gold bg-green rounded-2xl lg:w-[307px] lg:h-[543px] p-6"
            >
              <h1 className="flex justify-center text-white text-4xl mt-[51px] mb-[44px]">
                {slide.tier}
              </h1>
              <ul className="text-greyish ml-[42px] mb-[85px] w-[241px] pr-2 font-light">
                <li className="pb-[26px] w-[241px]">
                  <span className="text-gold mr-[14px] pt-2">◆</span>
                  {slide.workingdays}
                </li>
                <li>
                  <span className="text-gold mr-[14px] pt-2 w-[241px]">◆</span>
                  {slide.description}
                </li>
              </ul>
              <h2 className="text-4xl text-white flex justify-center mb-[49px]">
                {slide.price}
                <span className="text-[13px] text-greyish font-light">
                  /day
                </span>
              </h2>
              <div className="h-[2px] bg-gold"></div>
              <div className="relative flex justify-center -top-[25px]">
                <button className="bg-gold text-2xl h-[50px] w-[130px] rounded-[57px] hover:bg-yellow-500 font-semibold">
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricecard;
