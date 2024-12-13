/* eslint-disable @next/next/no-img-element */

/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */

import React from "react";
import "./developers.scss";
import developers from "../../../../public/data/developer.json";

const Developers = () => {
  return (
    <div className="dev-container">
      <h1>Developed by E-cell ,Nit Silchar</h1>

      <div className="dev-grid">
        {developers.map((member) => {
          return (
            <div className="dev-card">
              <img className="dev-image" src={member.image} alt={member.name} />
              <h2 className="dev-name">{member.name}</h2>
              <p className="dev-role">{member.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Developers;
