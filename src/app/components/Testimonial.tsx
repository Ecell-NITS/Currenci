"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

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

const testData = [
  {
    user: {
      userId: 1,
      name: "Batman",
      image:
        "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.",
  },
  {
    user: {
      userId: 2,
      name: "Batman",
      image:
        "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.",
  },
  {
    user: {
      userId: 3,
      name: "Batman",
      image:
        "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.",
  },
  {
    user: {
      userId: 4,
      name: "Batman",
      image:
        "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.",
  },
  {
    user: {
      userId: 5,
      name: "Batman",
      image:
        "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.",
  },
  {
    user: {
      userId: 6,
      name: "Batman",
      image:
        "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.",
  },
  {
    user: {
      userId: 7,
      name: "Batman",
      image:
        "https://4kwallpapers.com/images/wallpapers/batman-dc-superheroes-dc-comics-cosplay-2048x2048-954.jpg",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.Lorem ipsum dolor sit amet consectetur. Id vitae viverra habitant quam. Commodo ultrices phasellus morbi nunc. Parturient amet massa nunc ac sem sit. Id dignissim malesuada volutpat morbi. Eu phasellus urna lorem nunc orci est feugiat ut fringilla.",
  },
];

const truncateText = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return `${words.slice(0, maxWords).join(" ")}...`;
  }
  return text;
};

export default function Testimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <section>
      <div className="mt-12 w-screen overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testData.map((item, index) => (
            <div
              className="min-w-0 flex-[0_0_60vw] md:flex-[0_0_100%] flex justify-center"
              key={item.user.userId}
            >
              <div className="w-[80vw] hidden mx-[10vw] p-10 h-max rounded-3xl md:flex items-center justify-evenly bg-[#14342F] text-center border border-[#F2B263]">
                <div>
                  <Image
                    src={item.user.image}
                    alt="batman"
                    height={300}
                    width={300}
                    className="h-[15vw] w-auto rounded-xl"
                  ></Image>
                  <p
                    className="text-white text-4xl mt-5"
                    style={{ fontFamily: "Sofia Pro Regular" }}
                  >
                    {item.user.name}
                  </p>
                </div>
                <div className="w-[60%] max-h-[30vw] mt-10 flex">
                  <span className="text-[#F2B662] text-8xl relative font-serif bottom-4 right-4 flex gap-2">
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
                    className="text-white text-lg"
                    style={{ fontFamily: "Sofia Pro UltraLight" }}
                  >
                    {item.content}
                  </p>
                  <span className="text-[#F2B662] text-8xl relative font-serif top-44 flex gap-2 transform scale-x-[-1]">
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
                className={`w-[50vw] md:hidden py-[2vw] h-[80vw] rounded-3xl flex flex-col items-center justify-evenly text-center duration-700 border border-[#F2B263] ${index === selectedIndex ? "bg-[#14342F]" : ""}`}
              >
                <div>
                  <Image
                    src={item.user.image}
                    alt="batman"
                    height={300}
                    width={300}
                    className="h-[20vw] w-auto rounded-full"
                  ></Image>
                  <p
                    className="text-white text-[3.6vw]"
                    style={{ fontFamily: "Sofia Pro Regular" }}
                  >
                    {item.user.name}
                  </p>
                </div>
                <div className="w-[70%] mt-[3vw]">
                  <p
                    className={` text-[2.4vw] duration-700 ${index === selectedIndex ? "text-white" : ""}`}
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
            key={testData[index].user.userId}
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
