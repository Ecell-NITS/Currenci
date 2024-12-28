import Image from "next/image";
import Button from "./components/Button";
import SlideBox from "./components/Slidebox";
import aboutData from "../../public/data/about";
import Testimonial from "./components/Testimonial";
import Projects from "./components/Projects";
export const metadata = {
  title: "Currenci | Home",
  description: "Welcome",
};

export default function Home() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch("/api/v1/getUser");
  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data) {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // const handleLogOut = async () => {
  //   await fetch("/api/v1/signOut", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       router.push("/signIn");
  //       console.log(data.message);
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <main className="bg-white w-screen min-h-screen flex flex-col items-center pb-16">
      <div className="w-[80vw] h-[45vw] mt-10 rounded-lg md:rounded-3xl">
        <video
          controls
          loop
          className="w-full h-full object-cover rounded-lg md:rounded-3xl"
        >
          <source src="/aot.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col items-center justify-center mt-[5vw]">
        <h1
          className="text-4xl text-center tracking-wide md:text-6xl text-gray-800"
          style={{ fontFamily: "Sofia Pro SemiBold" }}
        >
          Valuing Today, Shaping Tomorrow
        </h1>
        <Button href="/">Get Started</Button>
      </div>
      <section className="mt-[6vw]  flex flex-col items-center">
        <h1
          className="text-[6vw] md:text-[4vw] text-gray-800"
          style={{ fontFamily: "Sofia Pro SemiBold" }}
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
                className="h-[20vw] w-auto"
              />
              <div className="mx-0 w-[65%]">
                <h1
                  className="text-[3.6vw] text-[#F2B263] text-start leading-[4.2vw]"
                  style={{ fontFamily: "Sofia Pro Light" }}
                >
                  {item.title}
                </h1>
                <p
                  className="text-start text-[2.4vw] md:text-[1.8vw] mt-[1vw] leading-[2.6vw] md:leading-[2vw]"
                  style={{ fontFamily: "Sofia Pro UltraLight" }}
                >
                  {item.content}
                </p>
              </div>
            </SlideBox>
          );
        })}
      </section>
      <section className="mt-[6vw] flex flex-col items-center">
        <h1
          className="text-[6vw] md:text-[4vw] text-gray-800"
          style={{ fontFamily: "Sofia Pro SemiBold" }}
        >
          Why Us?
        </h1>
        <Testimonial />
      </section>
      <section className="mt-[8vw] flex flex-col items-center">
        <h1
          className="text-[6vw] md:text-[4vw] text-gray-800"
          style={{ fontFamily: "Sofia Pro SemiBold" }}
        >
          Projects
        </h1>
        <Projects />
      </section>
    </main>
  );
}
