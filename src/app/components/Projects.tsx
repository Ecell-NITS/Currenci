"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const testData = [
  {
    title: "Financial Modeling",
    image: "distri.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Malesuada pharetra senectus fames metus in. Elementum sodales vestibulum maecenas vivamus justo leo varius. Elit pretium commodo libero malesuada sed nunc et. Fringilla cursus viverra tellus enim sed molestie vitae eu eu.",
  },
  {
    title: "Ratio Analysis",
    image: "plan.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Malesuada pharetra senectus fames metus in. Elementum sodales vestibulum maecenas vivamus justo leo varius. Elit pretium commodo libero malesuada sed nunc et. Fringilla cursus viverra tellus enim sed molestie vitae eu eu.",
  },
  {
    title: "Forecasting",
    image: "pred.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Malesuada pharetra senectus fames metus in. Elementum sodales vestibulum maecenas vivamus justo leo varius. Elit pretium commodo libero malesuada sed nunc et. Fringilla cursus viverra tellus enim sed molestie vitae eu eu.",
  },
  {
    title: "Discounted Cash Flow(DCF) (WACC)",
    image: "money.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Malesuada pharetra senectus fames metus in. Elementum sodales vestibulum maecenas vivamus justo leo varius. Elit pretium commodo libero malesuada sed nunc et. Fringilla cursus viverra tellus enim sed molestie vitae eu eu.",
  },
  {
    title: "Terminal Value(FCFF)",
    image: "val.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Malesuada pharetra senectus fames metus in. Elementum sodales vestibulum maecenas vivamus justo leo varius. Elit pretium commodo libero malesuada sed nunc et. Fringilla cursus viverra tellus enim sed molestie vitae eu eu.",
  },
  {
    title: "Intrinsic Growth",
    image: "career.png",
    content:
      "Lorem ipsum dolor sit amet consectetur. Malesuada pharetra senectus fames metus in. Elementum sodales vestibulum maecenas vivamus justo leo varius. Elit pretium commodo libero malesuada sed nunc et. Fringilla cursus viverra tellus enim sed molestie vitae eu eu.",
  },
];

export default function Projects() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <section>
      <div className="md:mt-12 mt-6 w-screen overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testData.map((item, index) => (
            <div
              className="min-w-0"
              style={{ flex: "0 0 100%" }}
              key={item.title}
            >
              <div
                className={`w-[84vw] h-[35vw] md:h-[30vw] mx-[10vw] p-[4vw] rounded-3xl flex items-center justify-evenly text-justify ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div>
                  <Image
                    src={`/images/${item.image}`}
                    alt="project"
                    height={300}
                    width={300}
                    className="h-auto w-[20vw] "
                  ></Image>
                </div>
                <div className="w-[65%] ml-4">
                  <h1
                    className="lg:text-5xl md:text-3xl text-lg md:leading-none leading-4  text-[#1E3432] text-start mb-4"
                    style={{ fontFamily: "Sofia Pro Regular" }}
                  >
                    {item.title}
                  </h1>
                  <p
                    className="lg:text-2xl md:text-[1rem] text-[0.5rem] lg:leading-none md:leading-5 leading-[0.6rem] text-start"
                    style={{ fontFamily: "Sofia Pro UltraLight" }}
                  >
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
