"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/v1/getUser");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data) {
            // setIsAuthenticated(true);
          } else {
            // setIsAuthenticated(false);
            router.push("/signIn");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, [router]);

  const handleLogOut = async () => {
    await fetch("/api/v1/signOut", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/signIn");
        console.log(data.message);
      })
      .catch((err) => console.error(err));
  };
  return (
    <main className="mt-32 mb-8 px-[5%] md:px-[10%] flex flex-col gap-4">
      <h2 className="text-[48px] mb-[10px] font-bold md:text-[40px] lg:text-[48px]">
        Welcome home, user
      </h2>
      <div className="flex justify-center gap-4 pl-2.5 pr-2.5 flex-wrap items-center w-[100%] h-fit p-4">
        <div className=" md:w-[40%] h-fit">
          <Image width={300} height={300} src="" />
        </div>
        <div className="w-[80%] md:w-[50%] h-fit flex justify-center items-center ">
          <div className="p-4 flex flex-col gap-4 w-[45%]">
            <h3 className="text-[24px] mb-[10px] font-bold md:text-[40px] lg:text-[36px]">
              User Name
            </h3>
          </div>
          <div className="p-4 flex  gap-4 w-[45%]">
            <button
              onClick={handleLogOut}
              className="px-2 py-1 border-2 border-[#F2B263] w-fit text-sm  rounded-xl  transition"
            >
              Logout
            </button>
            <button className="px-4 py-2 border-2 border-[#F2B263] text-sm  rounded-xl  transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-4 w-[100%] h-fit  p-4">
        <h2 className="text-[48px] mb-[10px] font-bold md:text-[40px] lg:text-[48px]">
          {" "}
          Published Review
        </h2>
        <div className="flex gap-3 justify-center items-center flex-wrap"></div>
      </div>
    </main>
  );
};

export default Dashboard;
