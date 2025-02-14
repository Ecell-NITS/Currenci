"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

export default function NavbarAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {}, [path]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/v1/getUser");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, [path]);

  const handleLogOut = async () => {
    await fetch("/api/v1/signOut", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/signIn");
        console.log(data.message);
      })
      .catch((err) => console.error(err));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { name: "Admin Dashboard", href: "/admin" },
    { name: "Team Management", href: "/admin/team" },
    { name: "Testimonial Management", href: "/admin/testimonials" },
  ];
  return (
    <nav
      className={`${
        isMenuOpen ? "hidden" : "bg-[#1E3432] "
      }whitespace-nowrap text-white  py-2 lg:py-4 rounded-full w-[90vw] fixed top-0  ml-[5vw] mt-4 z-50 transition-all duration-300 ease-in-out`}
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
          {/* Login Button */}

          {!isAuthenticated ? (
            <Link href="/signIn">
              <button
                className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-[#F2B263] 
        text-xs sm:text-xs  lg:text-base 
        rounded-lg sm:rounded-full 
        text-white hover:bg-[#F2B263] hover:text-[#14342F] transition"
              >
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogOut}
              className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-[#F2B263] 
        text-xs sm:text-xs  lg:text-base 
        rounded-lg sm:rounded-full 
        text-white hover:bg-[#F2B263] hover:text-[#14342F] transition"
            >
              Logout
            </button>
          )}
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
        <div className="flex justify-between items-center w-full h-fit  ">
          {/* Close Icon */}
          <div
            className="cursor-pointer  "
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
          <div className="flex justify-center items-center relative">
            <Image
              src="/images/CURRENCI.png"
              alt="Currenci Logo"
              width={150}
              height={15}
            />
          </div>

          {/* Login Button */}
          {!isAuthenticated ? (
            <Link href="/signIn">
              <button className="px-4 py-2 border-2 border-[#F2B263] text-sm  rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition text-center h-fit">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogOut}
              className="px-4 py-2 border-2 border-[#F2B263] text-sm  rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Menu Links */}
        <div className="flex flex-col gap-4 items-left">
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
