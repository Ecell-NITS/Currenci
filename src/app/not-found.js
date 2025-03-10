import Image from "next/image";

export const metadata = {
  title: "Currenci | Not Found",
  description:
    "Currenci is a cutting-edge financial company providing innovative solutions to help you manage, grow, and optimize your finances. The page requested does not exist on Currenci yet.",
};

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-[#F9FAFB] text-center text-gray-800 px-5 pt-20">
      <div className="relative w-full max-w-4xl h-[350px] md:h-[380px] lg:h-[400px] mx-auto mt-8">
        <Image
          src="/images/404.png"
          alt="404 Illustration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold  mt-2 lg:mt-5">
        Page not found
      </h1>
    </div>
  );
}
