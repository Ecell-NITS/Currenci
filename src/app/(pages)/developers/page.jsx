/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */

/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */

import Image from "next/image";
import styles from "./developers.module.scss";
import developers from "../../../../public/data/developer.json";

export async function generateMetadata() {
  return {
    title: "Developers | E-cell, NIT Silchar",
    description: "Meet the developers from E-cell, NIT Silchar.",
    openGraph: {
      title: "Developers | E-cell, NIT Silchar",
      description: "Meet the developers from E-cell, NIT Silchar.",
    },
  };
}

const Developers = () => {
  return (
    <div className={styles.devContainer}>
      <h1>Developed by E-cell ,Nit Silchar</h1>

      <div className={styles.devGrid}>
        {developers.map((member, index) => {
          return (
            <div key={index} className={styles.devCard}>
              <Image
                className={styles.devImage}
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
              ></Image>
              <h2 className={styles.devName}>{member.name}</h2>
              <p className={styles.devRole}>{member.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Developers;
