"use client";

import { useState } from "react";
import styles from "./feedback.module.scss";

const Feedback = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (e) => {
    // setSelectedOption();
    const { name } = e.target;
    setSelectedOption(name);
    console.log(name);
  };

  const options = ["Loved it", "Great", "Neutral", "Disappointing", "Terrible"];
  return (
    <div className={styles.feedback}>
      <h2>Your feedback matter to us</h2>
      <div className={styles.feedbackContainer}>
        <div className={styles.feedbackOptions}>
          <h3>How was your consultation?</h3>
          {options.map((option) => (
            <button
              className={`${styles.option} ${selectedOption === option ? styles.selected : ""}`}
              key={option}
              onClick={handleRadioChange}
              name={option}
            >
              <label>{option}</label>
              <input
                type="radio"
                className={styles.circle}
                checked={selectedOption === option}
                name={option}
                onChange={handleRadioChange}
              />
            </button>
          ))}
        </div>
        <div className={styles.feedbackMessageBox}>
          <h3>Share your experience</h3>
          <textarea
            name="feedbackMessage"
            placeholder="Share your feedback with us"
          ></textarea>
          <button type="submit">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
