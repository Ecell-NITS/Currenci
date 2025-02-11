"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("loading complete");
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Detect scrolling inside the div
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 500); // Reset after 500ms
      }
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
        <div className="flex  items-center justify-center h-screen">
          <Image
            src={isScrolling ? "/images/loading1.png" : "/images/loading.png"}
            alt="Loading"
            width={100}
            height={100}
          />
          <p className="text-black mt-2">
            {isScrolling ? "Loading & Scrolling..." : "Loading..."}
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-bold">Content Loaded</h1>
          <p>Here is your loaded content.</p>
          <div className="h-96 bg-blue-200 mt-4">
            Scroll down for more content...
          </div>
        </div>
      )}
    </div>
  );
}
