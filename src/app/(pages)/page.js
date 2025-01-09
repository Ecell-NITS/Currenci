import Image from "next/image";
import Button from "../components/Button";
import SlideBox from "../components/Slidebox";
import aboutData from "../../../public/data/about";
import Testimonial from "../components/Testimonial";
import Projects from "../components/Projects";
export const metadata = {
  title: "Currenci | Home",
  description: "Welcome",
};

export default function Home() {
  return (
    <main className="bg-white w-screen min-h-screen flex flex-col items-center pb-16">
      <div className="w-[70vw] rounded-lg md:rounded-3xl mt-[6.75rem]">
        <video
          controls
          loop
          className="w-full h-full object-cover rounded-lg md:rounded-3xl"
        >
          <source src="/aot.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col items-center justify-center md:mt-[2.5rem] mt-[1.5rem]">
        <h1
          className="text-4xl text-center md:text-6xl text-gray-800"
          style={{ fontFamily: "Sofia Pro Medium" }}
        >
          Valuing Today, Shaping Tomorrow
        </h1>
        <Button href="/">Get Started</Button>
      </div>
      <section className="md:mt-[6rem] mt-10  flex flex-col items-center">
        <h1
          className="text-4xl md:text-6xl text-gray-800"
          style={{ fontFamily: "Sofia Pro Medium" }}
        >
          Our Areas of Expertise
        </h1>
        {aboutData.map((item, index) => {
          return (
            <SlideBox side={index % 2 === 1} key={item.title}>
              <Image
                src={`/images/${item.image}`}
                alt="distribution"
                width={350}
                height={350}
                className="h-auto w-[20vw]"
              />
              <div className="mx-0 w-[65%]">
                <h1
                  className="lg:text-5xl md:text-3xl text-lg md:leading-none leading-4  text-[#1E3432] text-start mb-4"
                  style={{ fontFamily: "Sofia Pro Regular" }}
                >
                  {item.title}
                </h1>
                <p
                  className="lg:text-2xl md:text-[1rem] text-[0.5rem] lg:leading-none md:leading-5 leading-[0.6rem] text-start"
                  style={{ fontFamily: "Sofia Pro UltraLight" }}
                >
                  {item.content}
                </p>
              </div>
            </SlideBox>
          );
        })}
      </section>
      <section className="md:mt-[6rem] mt-10 flex flex-col items-center">
        <h1
          className="text-4xl text-center md:text-6xl text-gray-800"
          style={{ fontFamily: "Sofia Pro Medium" }}
        >
          Why Us?
        </h1>
        <Testimonial />
      </section>
      <section className="md:mt-[6rem] mt-10 flex flex-col items-center">
        <h1
          className="text-4xl text-center md:text-6xl text-gray-800"
          style={{ fontFamily: "Sofia Pro Medium" }}
        >
          Projects
        </h1>
        <Projects />
      </section>
    </main>
  );
}
