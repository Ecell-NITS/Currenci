import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1E3432] absolute bottom-11 text-white w-full  md:h-[40vh] h-[60vh] ">
      <div className="container mx-auto px-3 py-8  lg:py-10 lg:w-[80%] md:w-[90%] sm:w-full  md:h-[40vh] h-[60vh]">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-start">
          {/* Logo */}
          <div className="w-24 md:w-36 lg:w-44 h-auto">
            <Image
              src="/images/LOGO.png"
              alt="Currenci Logo"
              className="w-full h-auto"
              width={150} // Set appropriate width
              height={150} // Set appropriate height
            />
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <ul className="space-y-1 text-[#cccccc]">
              <li>
                <Link href="/about" className="hover:text-[#F2B263]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#F2B263]">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F2B263]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F2B263]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-bold mb-2">Pricing</h3>
            <ul className="space-y-1 text-[#cccccc]">
              <li>
                <Link href="/plans" className="hover:text-[#F2B263]">
                  Plans
                </Link>
              </li>
              <li>
                <Link href="/why-us" className="hover:text-[#F2B263]">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#F2B263]">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="text-lg font-bold mb-2">Testimonials</h3>
            <ul className="space-y-1 text-[#cccccc]">
              <li>
                <Link href="/why-trust-us" className="hover:text-[#F2B263]">
                  Why Trust Us?
                </Link>
              </li>
              <li>
                <Link href="/our-clients" className="hover:text-[#F2B263]">
                  Our Clients
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold mb-4">Socials</h3>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-[#F2B263]"
              >
                <FontAwesomeIcon icon={faFacebook} size="2xl" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-[#F2B263]"
              >
                <FontAwesomeIcon icon={faInstagram} size="2xl" />
              </Link>
              <Link
                href="https://whatsapp.com"
                target="_blank"
                className="hover:text-[#F2B263]"
              >
                <FontAwesomeIcon icon={faWhatsapp} size="2xl" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-[#F2B263]"
              >
                <FontAwesomeIcon icon={faTwitter} size="2xl" />
              </Link>
            </div>

            {/* Book an Appointment */}
            <div className="mt-6">
              <Link
                href="/book-appointment"
                className="inline-block px-4 py-2 border-2 border-[#F2B263] rounded-full hover:bg-[#F2B263] hover:text-[#1E3432] transition"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col md:hidden items-center space-y-6 text-center">
          {/* Book an Appointment */}
          <Link
            href="/book-appointment"
            className="inline-block px-4 py-2 border-2 border-[#F2B263] rounded-full hover:bg-[#F2B263] hover:text-[#1E3432] transition"
          >
            Book an Appointment
          </Link>

          {/* Grid Layout for Mobile View */}
          <div className="grid grid-cols-2 gap-6 w-full">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-bold mb-2">About Us</h3>
              <ul className="space-y-1 text-[#cccccc]">
                <li>
                  <Link href="/about" className="hover:text-[#F2B263]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-[#F2B263]">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#F2B263]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F2B263]">
                    Contact Us
                  </Link>
                </li>
              </ul>

              <h3 className="text-lg font-bold mt-8 mb-4">Testimonials</h3>
              <ul className="space-y-1 text-[#cccccc]">
                <li>
                  <Link href="/why-trust-us" className="hover:text-[#F2B263]">
                    Why Trust Us?
                  </Link>
                </li>
                <li>
                  <Link href="/our-clients" className="hover:text-[#F2B263]">
                    Our Clients
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Fees</h3>
              <ul className="space-y-1 text-[#cccccc]">
                <li>
                  <Link href="/plans" className="hover:text-[#F2B263]">
                    Plans
                  </Link>
                </li>
                <li>
                  <Link href="/why-us" className="hover:text-[#F2B263]">
                    Why Us
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-[#F2B263]">
                    FAQs
                  </Link>
                </li>
              </ul>

              <h3 className="text-lg font-bold mt-8 mb-4">Socials</h3>
              <div className=" text-[#cccccc] grid grid-cols-2 gap-1 justify-items-center mt-4 ">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:text-[#F2B263]"
                  style={{ margin: "0", padding: ".5rem" }}
                >
                  <FontAwesomeIcon icon={faFacebook} size="xl" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-[#F2B263]"
                  style={{ margin: "0", padding: "0.5rem" }}
                >
                  <FontAwesomeIcon icon={faInstagram} size="xl" />
                </Link>
                <Link
                  href="https://whatsapp.com"
                  target="_blank"
                  className="hover:text-[#F2B263]"
                >
                  <FontAwesomeIcon icon={faWhatsapp} size="xl" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="hover:text-[#F2B263]"
                >
                  <FontAwesomeIcon icon={faTwitter} size="xl" />
                </Link>
              </div>
            </div>
          </div>
          {/* Logo Centered at Bottom */}
          <div className="  mt-4 mb-4">
            <Image
              src="/images/LOGO.png"
              alt="Currenci Logo"
              className="w-32 h-auto mx-auto"
              width={150} // Set appropriate width
              height={150} // Set appropriate height
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" bg-[#1E3432] text-center text-[#a6a6a6]  text-sm py-4">
        <div className="w-[80%] h-[2px] bg-[#3A4A47]  mx-auto mb-2" />
        <p>© 2024 Currenci | All Rights Reserved | Developers</p>
      </div>
    </footer>
  );
}
