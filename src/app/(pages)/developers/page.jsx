/* eslint-disable @next/next/no-img-element */

/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */

import Image from "next/image";
import styles from "./developers.module.scss";
import developers from "../../../../public/data/developer.json";

const Developers = () => {
  return (
    <div className={styles.devContainer}>
      <h1>Developed by E-cell ,Nit Silchar</h1>

      <div className={styles.devGrid}>
        {developers.map((member) => {
          return (
            <div key={member.id} className={styles.devCard}>
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
