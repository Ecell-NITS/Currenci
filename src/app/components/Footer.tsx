// import Link from "next/link";
// import Image from "next/image";
// import { Icon } from "@iconify/react";

// const sections = [
//   {
//     title: "About Us",
//     links: [
//       { name: "About", href: "/about" },
//       { name: "Projects", href: "/projects" },
//       { name: "Privacy Policy", href: "/privacy-policy" },
//       { name: "Contact Us", href: "/contact" },
//     ],
//   },
//   {
//     title: "Fees",
//     links: [
//       { name: "Plans", href: "/plans" },
//       { name: "Why Us", href: "/why-us" },
//       { name: "FAQs", href: "/faqs" },
//     ],
//   },
//   {
//     title: "Testimonials",
//     links: [
//       { name: "Why Trust Us?", href: "/why-trust-us" },
//       { name: "Our Clients", href: "/our-clients" },
//     ],
//   },
// ];

// const socialLinks = [
//   { name: "Facebook", url: "https://facebook.com", icon: "mdi:facebook" },
//   { name: "Instagram", url: "https://instagram.com", icon: "mdi:instagram" },
//   { name: "Whatsapp", url: "https://whatsapp.com", icon: "mdi:whatsapp" },
//   { name: "Twitter", url: "https://twitter.com", icon: "mdi:twitter" },
// ];

// export default function Footer() {
//   return (
//     <footer className="bg-[#1E3432] absolute bottom-11 text-white w-full md:h-[40vh] h-[60vh]">
//       <div className="container mx-auto px-3 py-8 lg:py-10 lg:w-[80%] md:w-[90%] sm:w-full md:h-[40vh] h-[60vh]">
//         {/* Desktop View */}
//         <div className="hidden md:flex justify-between items-start">
//           {/* Logo */}
//           <div className="w-24 md:w-36 lg:w-44 h-auto">
//             <Image
//               src="/images/LOGO.png"
//               alt="Currenci Logo"
//               className="w-full h-auto"
//               width={150}
//               height={150}
//             />
//           </div>

//           {/* Sections */}
//           {sections.map(({ title, links }) => (
//             <div key={title}>
//               <h3 className="text-lg font-bold mb-2">{title}</h3>
//               <ul className="space-y-1 text-[#cccccc]">
//                 {links.map(({ name, href }) => (
//                   <li key={name}>
//                     <Link href={href} className="hover:text-[#F2B263]">
//                       {name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           {/* Socials */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Socials</h3>
//             <div className="flex gap-4">
//               {socialLinks.map(({ name, url, icon }) => (
//                 <Link
//                   key={name}
//                   href={url}
//                   target="_blank"
//                   className="hover:text-[#F2B263]"
//                 >
//                   <Icon icon={icon} width={36} height={36} />
//                 </Link>
//               ))}
//             </div>

//             {/* Book an Appointment */}
//             <div className="mt-6">
//               <Link
//                 href="/book-appointment"
//                 className="inline-block px-4 py-2 border-2 border-[#F2B263] rounded-full hover:bg-[#F2B263] hover:text-[#1E3432] transition"
//               >
//                 Book an Appointment
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Mobile View */}
//         <div className="flex flex-col md:hidden items-center space-y-6 text-center">
//           {/* Book an Appointment */}
//           <Link
//             href="/book-appointment"
//             className="inline-block px-4 py-2 border-2 border-[#F2B263] rounded-full hover:bg-[#F2B263] hover:text-[#1E3432] transition"
//           >
//             Book an Appointment
//           </Link>

//           {/* Grid Layout for Mobile View */}
//           <div className="grid grid-cols-2 gap-6 w-full">
//             {sections.map(({ title, links }) => (
//               <div key={title}>
//                 <h3 className="text-sm sm:text-lg font-bold mb-2">{title}</h3>
//                 <ul className="space-y-1 text-xs text-[#cccccc]">
//                   {links.map(({ name, href }) => (
//                     <li key={name}>
//                       <Link href={href} className="hover:text-[#F2B263]">
//                         {name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//             {/* Socials */}
//             <div>
//               <h3 className="text-sm sm:text-lg font-bold mb-4">Socials</h3>
//               <div className="grid grid-cols-2 gap-0.1 justify-items-center mt-1">
//                 {socialLinks.map(({ name, url, icon }) => (
//                   <Link
//                     key={name}
//                     href={url}
//                     target="_blank"
//                     className="hover:text-[#F2B263] p-2"
//                   >
//                     <Icon icon={icon} width={25} height={25} />
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Logo Centered at Bottom */}
//           <div className="mt-2 sm:mt-4 md:mt-6 mb-4">
//             <Image
//               src="/images/LOGO.png"
//               alt="Currenci Logo"
//               className="w-32 h-auto mx-auto"
//               width={150}
//               height={150}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="bg-[#1E3432] text-center text-[#a6a6a6] text-sm py-4">
//         <div className="w-[80%] h-[2px] bg-[#3A4A47] mx-auto mb-2" />
//         <p>© 2024 Currenci | All Rights Reserved | Developers</p>
//       </div>
//     </footer>
//   );
// }
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

const sections = [
  {
    title: "About Us",
    links: [
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Fees",
    links: [
      { name: "Plans", href: "/plans" },
      { name: "Why Us", href: "/why-us" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Testimonials",
    links: [
      { name: "Why Trust Us?", href: "/why-trust-us" },
      { name: "Our Clients", href: "/our-clients" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", url: "https://facebook.com", icon: "mdi:facebook" },
  { name: "Instagram", url: "https://instagram.com", icon: "mdi:instagram" },
  { name: "Whatsapp", url: "https://whatsapp.com", icon: "mdi:whatsapp" },
  { name: "Twitter", url: "https://twitter.com", icon: "mdi:twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E3432] absolute bottom-11 text-white w-full md:h-[40vh] h-[60vh]">
      <div className="container mx-auto px-3 py-8 lg:py-10 lg:w-[80%] md:w-[90%] sm:w-full md:h-[40vh] h-[60vh]">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-start">
          {/* Logo */}
          <div className="w-24 md:w-36 lg:w-44 h-auto">
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
              <ul className="  space-y-1 text-[#cccccc]">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="hover:text-[#F2B263]">
                      {name}
                    </Link>
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
                <Link
                  key={name}
                  href={url}
                  target="_blank"
                  className="hover:text-[#F2B263]"
                >
                  <Icon icon={icon} width={36} height={36} />
                </Link>
              ))}
            </div>

            {/* Book an Appointment */}
            <div className="mt-4">
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
        <div className="flex flex-col md:hidden items-center  flex justify-center mr-5 gap-3">
          {/* Book an Appointment */}
          <Link
            href="/book-appointment"
            // className="inline-block px-4 py-2 border-2 border-[#F2B263] rounded-full hover:bg-[#F2B263] hover:text-[#1E3432] transition"

            className="px-6 py-1 border-2 border-[#F2B263] 
            text-sm rounded-full text-white hover:bg-[#F2B263] hover:text-[#14342F] transition"
          >
            Book an Appointment
          </Link>

          {/* Grid Layout for Mobile View */}
          <div className="  grid grid-cols-2  gap-10 w-[52%]">
            {sections.map(({ title, links }, index) => (
              <div
                key={title}
                className={index === 1 || index === 3 ? "ml-11" : ""} // Add margin-left for "Fees" and "Socials" sections
              >
                <h3 className="text-sm  font-bold mb-4 whitespace-nowrap">
                  {title}
                </h3>
                <ul className="space-y-1  text-xs text-[#cccccc] whitespace-nowrap">
                  {links.map(({ name, href }) => (
                    <li key={name}>
                      <Link href={href} className="  hover:text-[#F2B263]">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Socials */}
            <div>
              <h3 className="text-sm  font-bold ml-11 ">Socials</h3>
              <div
                className="grid grid-cols-2 gap-0  ml-6"
                style={{
                  width: "70px", // Set total width for 2 columns (adjust as per your icon size)
                }}
              >
                {socialLinks.map(({ name, url, icon }) => (
                  <Link
                    key={name}
                    href={url}
                    target="_blank"
                    className="hover:text-[#F2B263]  flex items-center justify-center  w-12 h-10  "
                    style={{ margin: 0, padding: 0 }}
                  >
                    <Icon icon={icon} width={25} height={25} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Logo Centered at Bottom */}
          <div className="mt-2 sm:mt-2 md:mt-2">
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
      <div className="bg-[#1E3432] text-center text-[#a6a6a6] text-sm py-2">
        <div className="w-[80%] h-[2px] bg-[#3A4A47] mx-auto mb-2" />
        <p>© 2024 Currenci | All Rights Reserved | Developers</p>
      </div>
    </footer>
  );
}
