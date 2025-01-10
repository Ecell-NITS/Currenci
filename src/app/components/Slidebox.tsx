"use client";

import { useEffect, useRef } from "react";

export default function SlideBox({ children, side }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element?.classList.add(
            side ? "animate-slideLeft" : "animate-slideRight",
          );
          element?.classList.remove("opacity-0");
        }
      },
      { threshold: 1 },
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [side]);

  return (
    <div
      ref={ref}
      className={`w-[80vw] md:aspect-[16/5] aspect-[16/7] bg-angled-gradient rounded-[1rem] p-[2px] opacity-0 md:mt-[5.5rem] md:mb-[3.5rem] mt-[1.75rem] mb-[1.75rem] animate-none text-center text-2xl transition flex items-center justify-between ${side ? "translateX(-100%) flex-row-reverse" : "translateX(100%)"}`}
    >
      <div
        className={`h-full w-full lg::py-48 lg:px-14 md:py-32 md:px-8 py-14 px-4 bg-white rounded-[1rem] flex items-center justify-between ${side ? "flex-row-reverse" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
