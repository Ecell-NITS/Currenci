"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./feedback.module.scss";

const Feedback = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const options = ["Loved it", "Great", "Neutral", "Disappointing", "Terrible"];
  const handleRadioChange = (e) => {
    const { name } = e.target;
    setSelectedOption(name);
    console.log(5 - options.indexOf(name));
  };

  const addTest = async () => {
    if (!content) {
      setSubmitting(false);
      toast.error("Cannot submit empty feedback");
      return;
    }
    const res = await fetch(`/api/v1/addTestimonial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        rating: 5 - options.indexOf(selectedOption),
      }),
    });
    const data = await res.json();
    console.log(res);
    if (data.testimonial) {
      toast.success("Feedback submitted successfully");
    } else if (res.status === 403) {
      toast.error("Please sign in to submit feedback");
    }
    setSubmitting(false);
  };

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
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name="feedbackMessage"
            placeholder="Share your feedback with us"
          ></textarea>
          <button
            className={submitting ? "bg-[#a1a1a1] cursor-not-allowed" : ""}
            disabled={submitting}
            onClick={() => {
              setSubmitting(true);
              addTest();
            }}
          >
            {submitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
