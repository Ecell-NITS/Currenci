"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        if (scrollContainerRef.current.scrollTop > 50) {
          setIsLoading(false);
        }
      }
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-screen overflow-auto bg-gray-50 p-6 flex flex-col items-center"
    >
      {isLoading ? (
        <div className="animate-pulse flex flex-col items-center justify-center h-screen">
          <Image
            src="/images/loading.png"
            alt="Loading"
            width={80}
            height={80}
          />
          <p className="text-gray-600 text-lg font-semibold mt-2">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <Image
            src="/images/loading1.png"
            alt="Loaded"
            width={80}
            height={80}
          />
          <p className="text-green-600 text-lg font-semibold mt-2">Loaded</p>
        </div>
      )}
    </div>
  );
}
