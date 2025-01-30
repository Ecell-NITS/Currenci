"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Pricecard = () => {
  const [slides, setSlides] = useState([]);
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/v1/getAllPlans", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        const resp = await fetch("/api/v1/getUser");
        const info = await resp.json();
        if (info.role !== "client") setAuth(true);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch team members");
        }
        setSlides(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="bodie w-screen" style={{ fontFamily: "Sofia Pro Regular" }}>
      <div className="mb-[35px] ml-[1.7rem] md:ml-44 mt-24 mr-[1.3rem]">
        <h1 className="text-[48px] mb-[10px] font-bold md:text-[40px] lg:text-[48px]">
          Fees
        </h1>
        <p className="text-[17px] font-light md:text-[20px] lg:text-[24px]">
          Payment should be done before the work starts. <br />
        </p>
      </div>
      <div>
        <div className="flex flex-wrap justify-center gap-4 pl-2.5 pr-2.5">
          {slides.map((slide) => (
            <div
              key={slide.name}
              className="border-4 border-gold bg-green rounded-2xl lg:w-[307px] lg:h-[543px] p-6"
            >
              <h1 className="flex justify-center text-white text-4xl mt-[51px] mb-[44px]">
                {slide.name}
              </h1>
              <ul className="text-greyish ml-[30px] mb-[85px] w-[241px] pr-2 font-light">
                <li className="pb-[26px] w-[241px]">
                  <span className="text-gold mr-[14px] pt-2">◆</span>
                  <span
                    className="text-lg text-white"
                    style={{ fontFamily: "Sofia Pro Medium" }}
                  >
                    {slide.days}{" "}
                  </span>
                  working days
                </li>
                <li>
                  <span className="text-gold mr-[14px] pt-2 w-[241px]">◆</span>
                  {slide.desc}
                </li>
              </ul>
              <h2 className="text-4xl text-white flex justify-center mb-[49px]">
                ₹{slide.price.toLocaleString("en-IN")}
                <span className="text-[13px] text-greyish font-light">
                  /day
                </span>
              </h2>
              <div className="h-[2px] bg-gold"></div>
              <div className="relative flex justify-center -top-[25px]">
                {auth ? (
                  <button
                    className="bg-gold text-2xl h-[50px] w-[130px] rounded-[57px] hover:bg-yellow-500 font-semibold flex items-center justify-center"
                    onClick={() =>
                      router.push(`/admin/planUpdate/${slide._id}`)
                    }
                  >
                    Edit
                  </button>
                ) : (
                  <a
                    href="https://wa.me/1234567890?text=Hello,%20I%20am%20interested%20in%20buying%20your%20product."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold text-2xl h-[50px] w-[130px] rounded-[57px] hover:bg-yellow-500 font-semibold flex items-center justify-center"
                  >
                    Buy now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricecard;
