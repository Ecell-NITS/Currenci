"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ITestimonial } from "../../model/Testimonial";

const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblApi) => {
    setScrollSnaps(emblApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((eblaApi) => {
    setSelectedIndex(eblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const DotButton = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button type="button" className={className} {...restProps}>
      {children}
    </button>
  );
};

const truncateText = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return `${words.slice(0, maxWords).join(" ")}...`;
  }
  return text;
};

export default function Testimonial() {
  const [test, setTest] = useState<ITestimonial[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`/api/v1/getApprovedTestimonial`);
      console.log(res);
      const data = await res.json();
      setTest(data);
    };
    fetchTest();
  }, []);
  return (
    <section>
      <div className="mt-12 w-screen overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {test.map((item, index) => (
            <div
              className="min-w-0 flex-[0_0_60vw] md:flex-[0_0_100%] flex justify-center"
              key={String(item._id)}
            >
              <div
                style={{ aspectRatio: "8/3" }}
                className="w-[80vw] hidden h-max rounded-3xl p-10 md:flex items-center gap-14 bg-[#14342F] text-white text-center border border-[#F2B263] realtive"
              >
                <div className="w-[26%] relative">
                  <Image
                    src={
                      item.user.imageUrl
                        ? item.user.imageUrl
                        : "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg"
                    }
                    alt="batman"
                    height={300}
                    width={300}
                    className="w-full h-auto rounded-xl"
                  ></Image>
                  <div className="text-white xLarge:text-4xl text-2xl mt-5">
                    <p style={{ fontFamily: "Sofia Pro Regular" }}>
                      {item.user.role === "admin" ||
                      item.user.role === "superadmin"
                        ? "Admin at Currenci"
                        : "Client at Currenci"}
                    </p>
                    <p style={{ fontFamily: "Sofia Pro Light" }}>
                      {item.username}
                    </p>
                  </div>
                </div>
                <div className="w-[65%] mt-10">
                  <span className="text-[#F2B662] text-8xl flex gap-2 mb-2 relative left-2">
                    <svg
                      width="20"
                      height="36"
                      viewBox="0 0 20 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 0H0.0999985V19.92L8.08 35.88H18L10.06 19.92H20V0Z"
                        fill="#FAC16A"
                      />
                    </svg>
                    <svg
                      width="20"
                      height="36"
                      viewBox="0 0 20 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 0H0.0999985V19.92L8.08 35.88H18L10.06 19.92H20V0Z"
                        fill="#FAC16A"
                      />
                    </svg>
                  </span>
                  <p
                    className="text-white mx-10 xLarge:text-2xl"
                    style={{ fontFamily: "Sofia Pro UltraLight" }}
                  >
                    {item.content.split(" ").slice(0, 80).join(" ")}...
                  </p>
                  <span className="text-[#F2B662] text-8xl font-serif flex gap-2 transform scale-x-[-1]">
                    <svg
                      width="20"
                      height="36"
                      viewBox="0 0 20 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 0H0.0999985V19.92L8.08 35.88H18L10.06 19.92H20V0Z"
                        fill="#FAC16A"
                      />
                    </svg>
                    <svg
                      width="20"
                      height="36"
                      viewBox="0 0 20 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 0H0.0999985V19.92L8.08 35.88H18L10.06 19.92H20V0Z"
                        fill="#FAC16A"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div
                className={`w-[50vw] md:hidden py-[0.6rem] aspect-[5/8] rounded-3xl flex flex-col items-center justify-evenly text-center duration-700 border border-[#F2B263] ${index === selectedIndex ? "bg-[#14342F]" : ""}`}
              >
                <div>
                  <Image
                    src={
                      item.user.imageUrl
                        ? item.user.imageUrl
                        : "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg"
                    }
                    alt="batman"
                    height={300}
                    width={300}
                    className="h-auto w-[20vw] rounded-full"
                  ></Image>
                  <p
                    className="text-white  md:text-black text-[0.9rem]"
                    style={{ fontFamily: "Sofia Pro Regular" }}
                  >
                    {item.username}
                  </p>
                </div>
                <div className="w-[70%] mt-[0.8rem]">
                  <p
                    className={` text-[0.6rem] duration-700 ${index === selectedIndex ? "text-white" : ""}`}
                    style={{ fontFamily: "Sofia Pro UltraLight" }}
                  >
                    {truncateText(item.content, 50)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-screen md:flex justify-center mt-4 hidden">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={test[index]._id}
            onClick={() => onDotButtonClick(index)}
            className={"h-3 w-3 mx-1 rounded-full bg-[#14342F]".concat(
              index === selectedIndex ? " bg-[#F2B263]" : "",
            )}
          />
        ))}
      </div>
    </section>
  );
}
