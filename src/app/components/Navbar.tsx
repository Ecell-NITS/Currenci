"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#1E3432] text-white py-4 rounded-full shadow-lg w-[90%] mx-auto mt-6 relative z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        
        {/* Left Section (Hamburger Icon for Mobile) */}
        <div className="md:hidden flex items-center ml-10" onClick={toggleMenu}>
          {isMenuOpen ? (
            <div className="space-y-2">
              <div className="w-6 h-0.5 bg-[#F2B263] mb-1"></div>
              <div className="w-6 h-0.5 bg-[#F2B263] mb-1"></div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-6 h-0.5 bg-[#F2B263]"></div>
              <div className="w-6 h-0.5 bg-[#F2B263]"></div>
              <div className="w-6 h-0.5 bg-[#F2B263]"></div>
            </div>
          )}
        </div>

        {/* Center Section (Logo) */}
        <div className={`flex justify-center md:justify-start flex-1 ${isMenuOpen ? "hidden" : ""}`}>
          <img 
            src="/images/LOGO.png" 
            alt="Currenci Logo" 
            className="w-28 sm:w-34 md:w-36 lg:w-42 xl:w-48 h-auto"
          />
        </div>

        {/* Right Section (Login Button for Desktop) */}
        <div className="hidden md:flex items-center gap-6 md:gap-8">
          {/* Links */}
          <Link href="/about" className="text-sm md:text-base lg:text-lg font-semibold text-white hover:text-[#F2B263]">
            About
          </Link>
          <Link href="/fees" className="text-sm md:text-base lg:text-lg font-semibold text-white hover:text-[#F2B263]">
            Fees
          </Link>
          <Link href="/team" className="text-sm md:text-base lg:text-lg font-semibold text-white hover:text-[#F2B263]">
            Team
          </Link>

          {/* Book Appointment Button */}
          <Link href="/book-appointment">
            <div className="px-4 py-2 border-2 border-[#F2B263] text-sm md:text-base lg:text-lg font-semibold rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition duration-300">
              Book an Appointment
            </div>
          </Link>
          <Link href="/login">
            <div className="px-4 py-2 border-2 border-[#F2B263] text-sm md:text-base lg:text-lg font-semibold rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition duration-300">
              Login
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu (when hamburger is clicked) */}
      <div 
        className={`md:hidden fixed top-0 left-0 w-[75%] h-full bg-[#1E3432] p-6 transition-all duration-300 ease-in-out z-40 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Cross Icon and Menu Links */}
        <div className="flex justify-between items-center mb-6">
          {/* Close (Cross) Icon */}
          <div className="cursor-pointer" onClick={toggleMenu}>
            <div className="w-6 h-0.5 bg-[#F2B263]  transform rotate-45 "></div>
            <div className="w-6 h-0.5 bg-[#F2B263] transform -rotate-45 mt-[-0.15rem]"></div>
          </div>

          {/* Logo */}
          <div className="flex-1 text-center">
            <img 
              src="/images/LOGO.png" 
              alt="Currenci Logo" 
              className="w-28 sm:w-32 md:w-36 lg:w-32 h-auto" 
            />
          </div>

          {/* Login Button (Right Side) */}
          <div className="flex justify-end">
            <Link href="/login">
              <div className="px-4 py-2 border-2 border-[#F2B263] text-sm md:text-base lg:text-lg font-semibold rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition duration-300">
                Login
              </div>
            </Link>
          </div>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col gap-4 items-center">
          <Link href="/book-appointment">
            <div className="px-4 py-2 border-2 border-[#F2B263] text-sm md:text-base lg:text-lg font-semibold rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition duration-300 whitespace-nowrap">
              Book an Appointment
            </div>
          </Link>
          <Link href="/about" className="text-white text-lg font-semibold hover:text-[#F2B263]">
            About
          </Link>
          <Link href="/fees" className="text-white text-lg font-semibold hover:text-[#F2B263]">
            Fees
          </Link>
          <Link href="/team" className="text-white text-lg font-semibold hover:text-[#F2B263]">
            Team
          </Link>
          <Link href="/testimonials" className="text-white text-lg font-semibold hover:text-[#F2B263]">
            Testimonials
          </Link>
          <Link href="/faqs" className="text-white text-lg font-semibold hover:text-[#F2B263]">
            FAQs
          </Link>
        </div>
      </div>
    </nav>
  );
}
