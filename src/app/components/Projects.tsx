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
      <div className="mt-12 w-screen overflow-hidden" ref={emblaRef}>
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
                    className="h-[20vw] w-auto "
                  ></Image>
                </div>
                <div className="w-[65%] ml-4">
                  <p
                    className="text-[3.6vw] text-[#F2B263] text-start leading-[4.2vw] tracking-wide"
                    style={{ fontFamily: "Sofia Pro Light" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-start text-[2.4vw] md:text-[1.8vw] mt-[1vw] leading-[2.6vw] md:leading-[2vw] tracking-wide"
                    style={{ fontFamily: "Sofia Pro ExtraLight" }}
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
