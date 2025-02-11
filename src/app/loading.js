"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);

  // Simulating actual content load (API Fetch or Data Processing)
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      }); // Simulated API call
      console.log("Content Loaded Successfully");
      setLoading(false); // Only hide loader when data is ready
    };
    fetchData();
  }, []);

  // Scroll Detection Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 500);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-screen overflow-auto bg-gray-100 p-4"
    >
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Image
            src="/images/loading.png"
            alt="Loading"
            width={100}
            height={100}
          />
          <p className="text-black mt-2">Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center h-screen">
            <Image
              src={
                isScrolling ? "/images/loading (1).png" : "/images/loading.png"
              }
              alt="Loading"
              width={100}
              height={100}
            />
            <p className="text-black mt-2">
              {isScrolling ? "Loading & Scrolling..." : "Loaded"}
            </p>
          </div>
          <h1 className="text-lg font-bold">Content Loaded</h1>
          <p>Here is your loaded content.</p>
          <div className="h-96 bg-blue-200 mt-4">
            Scroll down for more content...
          </div>
        </>
      )}
    </div>
  );
}
