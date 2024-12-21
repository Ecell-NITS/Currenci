/* eslint-disable no-unused-vars */

"use client";

import { useState } from "react";
import styles from "./feedback.module.scss";

const Feedback = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.name);
  };

  return (
    <div className={styles.boxContent}>
      <div className={styles.boxContainer}>
        <h1 className={styles.content}> Your feedback matter to us</h1>
        <h2 className={styles.content1}>How was the consultation?</h2>
        <div className={styles.boxes}>
          <div className={styles.boxSelection}>
            <label className={styles.option1}>
              <h4>Loved it</h4>
              <input
                type="radio"
                name="Loved it"
                id="circle"
                className={styles.circle}
                checked={selectedOption === "Loved it"}
                onChange={handleRadioChange}
              />
            </label>
            <label className={styles.option2}>
              <h4> Great</h4>
              <input
                type="radio"
                name="Great"
                id="circle"
                className={styles.circle}
                checked={selectedOption === "Great"}
                onChange={handleRadioChange}
              />
            </label>
            <label className={styles.option3}>
              <h4>Neutral</h4>
              <input
                type="radio"
                name="Neutral"
                id="circle"
                className={styles.circle}
                checked={selectedOption === "Neutral"}
                onChange={handleRadioChange}
              />
            </label>
            <label className={styles.option4}>
              <h4>Disappointing</h4>
              <input
                type="radio"
                name="Disappointing"
                id="circle"
                className={styles.circle}
                checked={selectedOption === "Disappointing"}
                onChange={handleRadioChange}
              />
            </label>
            <label className={styles.option5}>
              <h4>Terrible</h4>
              <input
                type="radio"
                name="Terrible"
                id="circle"
                className={styles.circle}
                checked={selectedOption === "Terrible"}
                onChange={handleRadioChange}
              />
            </label>
          </div>
          <div className={styles.feedbackBox}>
            <h2 className={styles.shareBox}>Share Your Experience!</h2>
            <textarea
              name="Text"
              placeholder="Leave your valuable feedback here!"
              id="text-content"
              cols="70"
              rows="15"
              className={styles.textContent}
            ></textarea>
            <button className={styles.submitBtn}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
