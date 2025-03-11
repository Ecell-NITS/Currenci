"use client";

// import { set } from "mongoose";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [test, setTest] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/v1/getUser");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          // console.log(data);
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

  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`/api/v1/getApprovedTestimonial`);
      const data = await res.json();
      setTest(data.filter((item) => item.username === user.username));
      // console.log(test);
    };
    fetchTest();
  }, [user]);

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
        Welcome home, {user?.name ? user.name.split(" ")[0] : "User"}{" "}
      </h2>
      <div className="flex justify-center gap-4 pl-2.5 pr-2.5 flex-wrap items-center w-[100%] h-fit p-4">
        <div className=" md:w-[40%] h-fit">
          <Image
            width={300}
            height={300}
            src={`${user?.image ? user.image : "/images/placeholder_image.jpg"}`}
          />
        </div>
        <div className="w-[80%] md:w-[50%] h-fit flex justify-center items-center ">
          <div className="p-4 flex flex-col gap-4 w-[45%]">
            <h3 className="text-[24px] mb-[10px] font-bold md:text-[40px] lg:text-[36px]">
              {user?.name ? user.name : "User"}
            </h3>
          </div>
          <div className="p-4 flex flex-wrap  gap-4 w-[45%]">
            <button
              onClick={handleLogOut}
              className="px-2 py-1 border-2 border-[#F2B263] w-fit text-sm  rounded-xl  transition"
            >
              Logout
            </button>
            <Link
              href="/edit-profile"
              className="px-4 py-2 border-2 border-[#F2B263] text-sm  rounded-xl  transition"
            >
              Edit Profile
            </Link>
            {user?.role === "admin" ? (
              <Link
                href="/admin"
                className="px-4 py-2 border-2 border-[#F2B263] text-sm  rounded-xl  transition"
              >
                Admin Panel
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-4 w-[100%] h-fit  p-4">
        <h2 className="text-[48px] mb-[10px] font-bold md:text-[40px] lg:text-[48px]">
          {" "}
          Published Review
        </h2>
        <div className="flex gap-3 justify-center items-center flex-wrap">
          {test.map((item) => (
            <div className="flex flex-col gap-4 p-4 w-96 h-64 border-2 border-black rounded text-black">
              <div className="flex flex-col gap-4">
                <h3 className="text-[24px] mb-[10px]  md:text-[28px] lg:text-[32px]">
                  <span className="font-bold">Rating :</span> {item.rating}
                </h3>
                <p className="text-[20px] md:text-[24px] lg:text-[26px]">
                  <span className="font-bold"> What you said: </span>
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
