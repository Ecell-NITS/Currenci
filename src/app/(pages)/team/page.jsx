/* eslint-disable @next/next/no-img-element */

/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React from "react";
import "./team.scss";
import teamMembers from "../../../../public/data/team.json";

const Team = () => {
  return (
    <div className="team-container">
      <h1>Developed by E-cell ,Nit Silchar</h1>
      <div className="team-grid">
        {teamMembers.map((member) => {
          return (
            <div className="team-card">
              <img
                className="team-image"
                src={member.image}
                alt={member.name}
              />
              <h2 className="team-name">{member.name}</h2>
              <p className="team-role">{member.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Team;
