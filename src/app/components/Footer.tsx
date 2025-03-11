"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";

type Section = {
  title: string;
  links: { name: string; href: string }[];
};

type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

const sections: Section[] = [
  {
    title: "About Us",
    links: [
      { name: "About", href: "/#about" },
      { name: "Projects", href: "/#projects" },
      {
        name: "Contact Us",
        href: "https://api.whatsapp.com/send?phone=916026765255",
      },
      { name: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "Fees",
    links: [
      { name: "Plans", href: "/pricing" },
      { name: "Customer Feedback", href: "/pricing/#WhyTrustUS" },
    ],
  },
  {
    title: "Testimonials",
    links: [
      { name: "Why Trust Us?", href: "#testimonial" },
      { name: "Our Clients", href: "#testimonial" },
      { name: "Leave a Feedback", href: "/feedback" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { name: "Facebook", url: "https://facebook.com", icon: "mdi:facebook" },
  { name: "Instagram", url: "https://instagram.com", icon: "mdi:instagram" },
  { name: "Twitter", url: "https://twitter.com", icon: "mdi:twitter" },
];

// Scroll function
const handleScroll = (id: string) => {
  if (id === "pricing" || id === "about") return; // No scrolling for these
  const section = document.getElementById(id);
  if (section) {
    const navbarHeight = 100;

    window.scrollTo({
      top: section.offsetTop - navbarHeight,
      behavior: "smooth",
    });
  }
};

export default function Footer() {
  return (
    <footer className="bg-[#1E3432] py-4 text-white w-full h-fit">
      <div className="container mx-auto px-3 py-8 lg:py-10 lg:w-[80%] md:w-[90%] sm:w-full h-fit-content">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-start">
          {/* Logo */}
          <div className="w-24 md:w-36 lg:w-48 h-auto">
            <Image
              src="/images/CURRENCI.png"
              alt="Currenci Logo"
              className="w-full h-auto"
              width={150}
              height={150}
            />
          </div>

          {/* Sections */}
          {sections.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-lg font-bold mb-6">{title}</h3>
              <ul className="space-y-1 text-[#cccccc]">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href}> {name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold mb-4">Socials</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ name, url, icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F2B263]"
                >
                  <Icon icon={icon} width={36} height={36} />
                </a>
              ))}
            </div>

            {/* Book an Appointment */}
            <div className="mt-4">
              <a
                target="blank"
                href="https://wa.me/916295265705?text=Hi%20Currenci,%20I%20would%20like%20to%20book%20an%20appointment"
                className="inline-block px-4 py-2 border-2 border-[#F2B263] rounded-full hover:bg-[#F2B263] hover:text-[#1E3432] transition"
              >
                Book an Appointment
              </a>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col md:hidden items-center justify-center mr-5 gap-3">
          {/* Book an Appointment */}
          <a
            href="https://api.whatsapp.com/send?phone=916026765255"
            className="px-6 py-1 mb-4 border-2 border-[#F2B263] text-sm rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition"
          >
            Book an Appointment
          </a>

          {/* Grid Layout for Mobile View */}
          <div className="grid grid-cols-2 gap-10 w-[73%]">
            {sections.map(({ title, links }, index) => (
              <div
                key={title}
                className={index === 1 || index === 3 ? "ml-11" : ""}
              >
                <h3 className="text-sm font-bold mb-4 whitespace-nowrap">
                  {title}
                </h3>
                <ul className="space-y-1 text-xs text-[#cccccc] whitespace-nowrap">
                  {links.map(({ name, href }) => (
                    <li key={name}>
                      <button
                        onClick={() => handleScroll(href.substring(1))}
                        className="hover:text-[#F2B263] cursor-pointer bg-transparent border-none"
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Socials */}
            <div>
              <h3 className="text-sm font-bold ml-11">Socials</h3>
              <div className="flex gap-4 ml-10 mt-2">
                {socialLinks.map(({ name, url, icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F2B263] flex items-center justify-center w-12 h-10"
                  >
                    <Icon icon={icon} width={25} height={25} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Logo Centered at Bottom */}
          <div className="mt-2">
            <Image
              src="/images/CURRENCI.png"
              alt="Currenci Logo"
              className="w-40 h-auto mx-auto"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#1E3432] mb-6 text-center text-[#a6a6a6] text-sm py-2">
        <div className="w-[80%] h-[2px] bg-[#3A4A47] mx-auto mb-6" />
        <p>© 2024 Currenci | All Rights Reserved </p>
        <a className="hover:text-[#F2B263]" href="/developers">
          <p>Developers</p>
        </a>
      </div>
    </footer>
  );
}
