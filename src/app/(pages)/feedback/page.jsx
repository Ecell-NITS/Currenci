/* eslint-disable no-unused-vars */
import React from "react";
import "./feedback.scss";

const Feedback = () => {
  return (
    <div className="box-content">
      <h1 className="content"> Your feedback matter to us</h1>
      <div className="box-container">
        <div className="content1">How was the consultation?</div>
        <div className="boxes">
          <div className="options">
            <div className="option-1">
              <h4>Loved it!</h4>
              <input type="radio" name="" id="circle" className="circle" />
            </div>
            <div className="option-2">
              <h4> Great</h4>
              <input type="radio" name="" id="circle" className="circle" />
            </div>
            <div className="option-3">
              <h4>Neutral</h4>
              <input type="radio" name="" id="circle" className="circle" />
            </div>
            <div className="option-4">
              <h4>Disappointing</h4>
              <input type="radio" name="" id="circle" className="circle" />
            </div>
            <div className="option-5">
              <h4>Terrible</h4>
              <input type="radio" name="" id="circle" className="circle" />
            </div>
          </div>
          <div className="feedback-box">
            <h2 className="share-box">Share Your Experience!</h2>
            <textarea
              name="Text"
              placeholder="Text"
              id="text-content"
              cols="70"
              rows="15"
              className="text-content"
            ></textarea>
            <div className="submit-btn">Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
