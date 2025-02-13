"use client";

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Lorem Ipsum1",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "What is Lorem Ipsum2",
      answer:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      question: "What is Lorem Ipsum3",
      answer:
        "It has survived not only five centuries, but also the leap into electronic typesetting.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="lg:w-[1050px] md:w-[700px] sm:w-[326px] mx-auto p-6"
      style={{ fontFamily: "Sofia Pro Regular" }}
    >
      <h1
        className="sm:text-xl lg:text-5xl md:text-3xl font-normal text-center mt-[24px] mb-[34px]"
        style={{ fontFamily: "Sofia Pro Regular" }}
      >
        Frequently Asked Questions
      </h1>
      <div>
        {faqData.map((item, index) => (
          <div key={item.question}>
            {" "}
            {/* Use a unique key based on the question */}
            <button
              className="flex justify-between items-center p-4 cursor-pointer bg-white w-full"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index} // Indicates whether the accordion is open
              aria-controls={`answer-${index}`} // Links the button to the corresponding answer
              style={{ fontFamily: "Sofia Pro Regular" }}
            >
              <div className="sm:text-lg lg:text-4xl font-normal">
                {item.question}
              </div>
              <FaChevronDown
                className={`transform transition-transform duration-300 text-4xl ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`answer-${index}`} // Matches the aria-controls attribute
              className={`overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? "max-h-40 opacity-100 ease-in"
                  : "max-h-0 opacity-0 ease-out"
              }`}
            >
              <div
                className="sm:text-lg py-2 px-5 lg:text-2xl md:text-xl bg-white text-gray-600"
                style={{ fontFamily: "Sofia Pro Regular" }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
