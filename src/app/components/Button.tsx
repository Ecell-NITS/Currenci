import Link from "next/link";

export default function Button({ children, href }) {
  return (
    <div className="md:mt-[3rem] mt-4 p-[2px] py-[2px] rounded-full flex items-center justify-center bg-[#F2B263] hover:bg-gradient-to-r hover:from-white to-[#F2B263] duration-300">
      <Link
        href={href}
        className="cursor-pointer px-[4vw] py-[1vw] bg-[#14342F] md:text-3xl text-xl text-white rounded-full"
      >
        <p className="select-none" style={{ fontFamily: "Sofia Pro Medium" }}>
          {children}
        </p>
      </Link>
    </div>
  );
}
