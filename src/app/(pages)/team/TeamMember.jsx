"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./team.module.scss";
import "../../globals.scss";
import members from "../../../../public/data/team";

const Team = () => {
  // eslint-disable-next-line no-unused-vars
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
    <div className={styles.teamContainer}>
      <h1>Team Members</h1>
      <div className={styles.teamGrid}>
        {members.map((member, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={styles.teamCard}>
              <Image
                className={styles.teamImage}
                src={member.image || "/images/placeholder_image.jpg"}
                alt={member.name}
                width={300}
                height={300}
              ></Image>
              <h2 className={styles.teamName}>{member.name}</h2>
              <p className={styles.teamRole}>{member.designation}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Team;
