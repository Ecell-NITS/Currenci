"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Appointment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: false,
    date: null,
    message: "",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFormData((prev) => ({ ...prev, date: new Date() }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCalendarChange = (date) => {
    setFormData({
      ...formData,
      date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Appointment booked successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="rounded-lg p-6 w-full lg:p-16 md:w-3/4 mt-[30px] md:mt-[1vh] lg:mt-[2vh]">
        <h1
          className="text-3xl lg:text-6xl md:text-5xl font-medium mb-4 md:mb-8"
          style={{ fontFamily: "Sofia Pro" }}
        >
          Book an Appointment
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div>
              <label className="block text-sm font-medium" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Smith"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div>
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johnsmith@email.com"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="1234567890"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="whatsapp"
                  id="whatsapp"
                  checked={formData.whatsapp}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="whatsapp" className="text-sm">
                  Same number on WhatsApp
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div>
              <label className="block text-sm font-medium" htmlFor="date">
                Date & Time
              </label>
              {isClient && (
                <Calendar
                  onChange={handleCalendarChange}
                  value={formData.date}
                  className="mt-4 border rounded-lg"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="message">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write anything here"
                className="mt-1 block w-full h-[93%] px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                rows="4"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 border-2 border-yellow-500 bg-white font-semibold text-lg rounded-3xl hover:bg-slate-300 transition lg:w-[10vw]"
              style={{ fontFamily: "Sofia Pro" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
