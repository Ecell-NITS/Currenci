"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { name: "About", href: "/about" },
    { name: "Fees", href: "/fees" },
    { name: "Team", href: "/team" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQs", href: "/faqs" },
  ];
  const buttons = [{ name: "Book an Appointment", href: "/book-appointment" }];
  return (
    <nav
      className={`${
        isMenuOpen ? "hidden" : "bg-[#1E3432] "
      }whitespace-nowrap text-white  py-2 lg:py-4 rounded-full max-w-[90%] sticky top-0   mx-auto mt-6 relative z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="container relative mx-auto flex justify-between items-center  md:px-8">
        {/* Left Section (Hamburger Icon for Mobile) */}
        <div
          className="absolute left-8 md:hidden flex items-center"
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          aria-label="Toggle menu"
          onKeyUp={(e) => (e.key === "Enter" || e.key === " ") && toggleMenu()}
        >
          <Icon
            icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
            width={32}
            height={32}
            className="text-[#F2B263]"
          />
        </div>

        {/* Center Section (Logo) */}
        <div
          className={`w-full  flex justify-center items-center  md:justify-start flex-1   ${isMenuOpen ? "hidden" : ""}`}
        >
          <Image
            src="/images/CURRENCI.png"
            alt="Currenci Logo"
            className="w-35 sm:w-30 md:w-36"
            width={150}
            height={150}
          />
        </div>

        {/* Right Section (Desktop Buttons) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          {menuLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="text-xs  lg:text-lg  text-white hover:text-[#F2B263]"
            >
              {name}
            </Link>
          ))}
          {buttons.map(({ name, href }) => (
            <Link key={name} href={href}>
              <div
                className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-[#F2B263] 
               text-sm sm:text-xs  lg:text-base 
               rounded-lg sm:rounded-full 
               text-white hover:bg-[#F2B263] hover:text-[#14342F] transition"
              >
                {name}
              </div>
            </Link>
          ))}
          {/* Login Button */}
          <Link href="/login">
            <div
              className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-[#F2B263] 
        text-xs sm:text-xs  lg:text-base 
        rounded-lg sm:rounded-full 
        text-white hover:bg-[#F2B263] hover:text-[#14342F] transition"
            >
              Login
            </div>
          </Link>
        </div>
      </div>
      {/* Background Overlay when the menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu} // Close menu when overlay is clicked
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleMenu();
          }}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0    min-w-[75%] h-full bg-[#1E3432] p-6 transition-all duration-300 z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center w-full   ">
          {/* Close Icon */}
          <div
            className="cursor-pointer absolute top-7 "
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            aria-label="Toggle menu"
            onKeyUp={(e) =>
              (e.key === "Enter" || e.key === " ") && toggleMenu()
            }
          >
            <Icon
              icon="mdi:close"
              width={32}
              height={32}
              className="text-[#F2B263]"
            />
          </div>

          {/* Logo */}

          <Image
            src="/images/CURRENCI.png"
            alt="Currenci Logo"
            className="w-38 ml-6"
            width={150}
            height={150}
          />

          {/* Login Button */}
          <Link href="/login">
            <div className="px-4 py-2 border-2 border-[#F2B263] text-sm  rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition">
              Login
            </div>
          </Link>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col gap-4 items-left">
          {buttons.map(({ name, href }) => (
            <Link key={name} href={href}>
              <div className=" inline-flex mt-6  px-6 py-2 border-2 border-[#F2B263] text-sm   rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition whitespace-nowrap">
                {name}
              </div>
            </Link>
          ))}
          {menuLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className=" text-white sm:text-xl md:text-2xl   hover:text-[#F2B263] "
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
