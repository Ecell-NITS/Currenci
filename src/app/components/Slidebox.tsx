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
      className={`w-[84vw] h-[35vw] md:h-[30vw] bg-angled-gradient rounded-[1.5vw] p-[2px] opacity-0 mt-[8vw] mb-[6vw] animate-none text-center text-2xl transition flex items-center justify-between ${side ? "translateX(-100%) flex-row-reverse" : "translateX(100%)"}`}
    >
      <div
        className={`h-full w-full p-[4vw] bg-white rounded-[1.5vw] flex items-center justify-between ${side ? "flex-row-reverse" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
