"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import "../../../globals.scss";
import NavbarAdmin from "../../../components/NavbarAdmin";

const Team = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch("/api/v1/getAllTeamMembers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch team members");
        }
        setTeamMembers(data.teamMembers);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load team members.");
      }
    };
    fetchTeamMembers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col">
      <NavbarAdmin />
      <div className="flex flex-col my-36 px-[5vw] ">
        <p
          className="px-[10.5vw] text-lg mb-8"
          style={{ fontFamily: "Sofia Pro Regular" }}
        >
          Present Team:
        </p>
        <div className="flex px-[10.5vw] flex-wrap w-fit gap-[6vw]">
          {teamMembers.map((member) => {
            return (
              <div
                key={member.designation + member.name.toString}
                className="relative bg-[#1E3432] flex flex-col justify-center items-center rounded-[3vw] md:rounded-[1vw] hover:scale-[1.1] transition-all duration-200"
              >
                {/* <button className="absolute text-red-500 right-0 top-0 z-10 mt-2 mr-2">
                  <div className="flex gap-1">
                    <span className="font-semibold">Edit</span>
                    <FilePenLine />
                  </div>
                </button> */}
                <div className="relative md:w-[18vw] md:h-[18vw] w-[31vw] h-[30vw] ">
                  <Image
                    className="md:rounded-t-[1vw] rounded-t-[3vw] object-cover"
                    src={member.image || "/images/placeholder_image.jpg"}
                    alt={member.name}
                    fill
                  ></Image>
                </div>
                <p
                  className="text-[#F2B263] md:text-lg  sm:text-sm text-[4vw]  mt-2"
                  style={{ fontFamily: "Sofia Pro Light" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-white md:text-sm sm:text-xs text-[3vw] mb-2"
                  style={{ fontFamily: "Sofia Pro Regular" }}
                >
                  {member.designation}
                </p>
              </div>
            );
          })}
          <button
            onClick={() => router.push("addTeamMember")}
            className="bg-[#1E3432] flex flex-col justify-center items-center rounded-[3vw] md:rounded-[1vw] hover:scale-[1.1] transition-all duration-200"
          >
            <div className="relative md:w-[18vw] md:h-[18vw] w-[31vw] h-[30vw] ">
              <Image
                className="md:rounded-t-[1vw] rounded-t-[3vw] object-cover"
                src="/images/addTeamMemberButton.png"
                alt="add member"
                fill
              ></Image>
            </div>
            <p
              className="text-[#F2B263] md:text-lg  sm:text-sm text-[4vw]  my-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Add Employee
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Team;
