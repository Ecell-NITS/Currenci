"use client";

import Testimonial from "../../components/Testimonial";
import FAQ from "../../components/FAQ";
import Pricecard from "../../components/Pricecard";
import Modeling from "../../components/Modeling";
const Pricing = () => {
  return (
    <div>
      <Pricecard />
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1
          className="text-[6vw] md:text-[4vw] text-gray-800"
          style={{ fontFamily: "Sofia Pro Regular" }}
        >
          What others are saying about us?
        </h1>
      </div>
      <Testimonial />
      <Modeling />
      <FAQ />
    </div>
  );
};

export default Pricing;
