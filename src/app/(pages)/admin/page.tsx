"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavbarAdmin from "../../components/NavbarAdmin";

interface ITestimonial {
  _id: string;
  content: string;
  username: string;
  rating: number;
}

function truncateText(text, maxLength = 100) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const Team = () => {
  const [test, setTest] = useState<ITestimonial[]>();
  const options = [
    "Loved it!",
    "Great!",
    "Neutral",
    "Disappointing",
    "Terrible",
  ];
  const router = useRouter();

  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`/api/v1/getAllTestimonial`);
      const data = await res.json();
      setTest(data);
    };
    fetchTest();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="flex flex-col md:flex-row my-36 px-[5vw] gap-10">
        <div className="flex items-end flex-col gap-8 md:w-[50%] w-full">
          <button
            onClick={() => router.push("/admin/team")}
            className="text-white bg-[#1E3432] border-[#FAC16A] border-4 rounded-lg py-4 px-4 lg:text-4xl sm:text-2xl text-xl w-full"
          >
            Team Management
          </button>
          <button
            onClick={() => router.push("/admin/testimonials")}
            className="text-white bg-[#1E3432] border-[#FAC16A] border-4 rounded-lg py-4 px-4 lg:text-4xl sm:text-2xl text-xl  w-full"
          >
            Testimonial Management
          </button>
          <button
            onClick={() => router.push("/pricing")}
            className="text-white bg-[#1E3432] border-[#FAC16A] border-4 rounded-lg py-4 px-4 lg:text-4xl sm:text-2xl text-xl  w-full"
          >
            Plan Update
          </button>
          <button
            onClick={() => router.push("/admin/addTeamMember")}
            className="text-white bg-[#1E3432] border-[#FAC16A] border-4 rounded-lg py-4 px-4 lg:text-4xl sm:text-2xl text-xl  w-full"
          >
            Add Member
          </button>
        </div>
        <div className="md:w-[50%] w-full h-[70vh] overflow-y-scroll overflow-x-hidden flex flex-col border-black border-2 rounded-sm p-6">
          <button className="bg-[#1E3432] w-fit text-[#FAC16A] text-lg px-4 py-2 rounded-md flex gap-2 items-center hover:cursor-pointer">
            <p>Total Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test ? test.length : 0}
            </span>
          </button>
          <p className="text-xl mt-10 mb-2">Recent Reviews</p>

          {test &&
            test.map((item) => (
              <div
                key={item._id}
                className="border-[#D1D1D1] mb-2 border rounded-md p-4 pb-6 relative text-sm"
              >
                <p>{options[5 - item.rating]}</p>
                <p style={{ fontFamily: "Sofia Pro Ultralight" }}>
                  {truncateText(item.content, 175)}
                </p>
                <p className="absolute bottom-0 right-2">~{item.username}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Team;
