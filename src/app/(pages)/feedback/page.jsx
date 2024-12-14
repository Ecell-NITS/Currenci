/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./feedback.module.scss";

const Feedback = () => {
  return (
    <div className={styles.boxContent}>
      <h1 className={styles.Content}> Your feedback matter to us</h1>
      <div className={styles.boxContainer}>
        <div className={styles.content1}>How was the consultation?</div>
        <div className={styles.boxes}>
          <div className={styles.boxSelection}>
            <div className={styles.option1}>
              <h4>Loved it!</h4>
              <input
                type="radio"
                name=""
                id="circle"
                className={styles.circle}
              />
            </div>
            <div className={styles.option2}>
              <h4> Great</h4>
              <input
                type="radio"
                name=""
                id="circle"
                className={styles.circle}
              />
            </div>
            <div className={styles.option3}>
              <h4>Neutral</h4>
              <input
                type="radio"
                name=""
                id="circle"
                className={styles.circle}
              />
            </div>
            <div className={styles.option4}>
              <h4>Disappointing</h4>
              <input
                type="radio"
                name=""
                id="circle"
                className={styles.circle}
              />
            </div>
            <div className={styles.option5}>
              <h4>Terrible</h4>
              <input
                type="radio"
                name=""
                id="circle"
                className={styles.circle}
              />
            </div>
          </div>
          <div className={styles.feedbackBox}>
            <h2 className={styles.shareBox}>Share Your Experience!</h2>
            <textarea
              name="Text"
              placeholder="Text"
              id="text-content"
              cols="70"
              rows="15"
              className={styles.textContent}
            ></textarea>
            <div className={styles.submitBtn}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
