/* eslint-disable @next/next/no-img-element */

/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import Image from "next/image";
import styles from "./team.module.scss";
import "../../globals.scss";
import teamMembers from "../../../../public/data/team.json";

export async function generateMetadata() {
  return {
    title: "Meet Our Team | Dedicated Professionals",
    description:
      "Get to know our team of dedicated professionals committed to delivering excellence.",
    openGraph: {
      title: "Meet Our Team | Dedicated Professionals",
      description:
        "Get to know our team of dedicated professionals committed to delivering excellence.",
    },
  };
}

const Team = () => {
  return (
    <div className={styles.teamContainer}>
      <h1>Team Members</h1>
      <div className={styles.teamGrid}>
        {teamMembers.map((member) => {
          return (
            <div className={styles.teamCard}>
              <Image
                className={styles.teamImage}
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
              ></Image>
              <h2 className={styles.teamName}>{member.name}</h2>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Team;
