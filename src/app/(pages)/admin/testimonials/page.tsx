"use client";

import { useEffect, useState } from "react";
import { Filter, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ITestimonial } from "../../../../model/Testimonial";

function truncateText(text, maxLength = 100) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function formatReviewDate(isoString, country = "India") {
  const date = new Date(isoString);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return `Reviewed in ${country} on ${formattedDate}`;
}

const Testimonials = () => {
  const [test, setTest] = useState<ITestimonial[]>([]);
  const [disp, setDisp] = useState<ITestimonial[]>([]);
  const [current, setCurrent] = useState<ITestimonial | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const options = [
    "Loved it!",
    "Great!",
    "Neutral",
    "Disappointing",
    "Terrible",
  ];
  const approve = async (id) => {
    setPublishing(true);
    const resp = await fetch("/api/v1/getUser");
    const info = await resp.json();
    if (info.role !== "admin" && info.role !== "superadmin") {
      toast.error("You're not authenticated");
      setTimeout(() => {
        setPublishing(false);
        router.push("/");
      }, 1000);
      return;
    }
    const res = await fetch(`/api/v1/approveTestimonial?Id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 403) {
      toast.error("You're not authorized");
      return;
    }
    if (res.status === 500) {
      toast.error("Something went wrong");
      return;
    }
    const data = await res.json();
    toast.success("Published successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#1E3432",
        maxWidth: "90%",
        padding: "10px",
        margin: "10px",
        width: "200px",
        fontSize: "16px",
        color: "#ffffff",
      },
    });
    setPublishing(false);
    setTest(data);
    setDisp(data.filter((item: ITestimonial) => !item.isApproved));
    setCurrent(null);
  };

  const deleti = async (id) => {
    setDeleting(true);
    const resp = await fetch("/api/v1/getUser");
    const info = await resp.json();
    if (info.role !== "admin" && info.role !== "superadmin") {
      toast.error("You're not authenticated");
      setTimeout(() => {
        setDeleting(false);
      }, 1000);
      return;
    }
    const res = await fetch(`/api/v1/deleteTestimonial?Id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 403) {
      toast.error("You're not authorized");
      return;
    }
    if (res.status === 500) {
      toast.error("Something went wrong");
      return;
    }
    const data = await res.json();
    toast.success("Deleted successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#1E3432",
        maxWidth: "90%",
        padding: "10px",
        margin: "10px",
        width: "200px",
        fontSize: "16px",
        color: "#ffffff",
      },
    });
    setDeleting(false);
    setTest(data);
    setDisp(data.filter((item: ITestimonial) => !item.isApproved));
    setCurrent(null);
  };
  const unpublish = async (id) => {
    setPublishing(true);
    const resp = await fetch("/api/v1/getUser");
    const info = await resp.json();
    if (info.role !== "admin" && info.role !== "superadmin") {
      toast.error("You're not authenticated");
      setTimeout(() => {
        setPublishing(false);
        router.push("/");
      }, 1000);
      return;
    }
    const res = await fetch(`/api/v1/unpublishTestimonial?Id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 403) {
      toast.error("You're not authorized");
      return;
    }
    if (res.status === 500) {
      toast.error("Something went wrong");
      return;
    }
    const data = await res.json();
    toast.success("Unpublished successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#1E3432",
        maxWidth: "90%",
        padding: "10px",
        margin: "10px",
        width: "200px",
        fontSize: "16px",
        color: "#ffffff",
      },
    });
    setPublishing(false);
    setTest(data);
    setDisp(data.filter((item: ITestimonial) => !item.isApproved));
    setCurrent(null);
  };

  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`/api/v1/getAllTestimonial`);
      const data = await res.json();
      const arr = data.filter((item: ITestimonial) => !item.isApproved);
      setTest(data);
      setDisp(arr);
    };
    fetchTest();
  }, []);

  return (
    <main
      className="bg-white w-screen min-h-screen flex flex-col pb-16"
      style={{ fontFamily: "Sofia Pro Light" }}
    >
      <div className="w-full px-[13vw] mt-36 mb-20">
        <div className="flex gap-4">
          <button
            onClick={() => setDisp(test.filter((item) => !item.isApproved))}
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Total Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test ? test.length : 0}
            </span>
          </button>
          <button
            onClick={() =>
              setDisp(
                test.filter((item) => item.rating > 3 && !item.isApproved),
              )
            }
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Good Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test
                ? test.filter((item) => item.rating > 3 && !item.isApproved)
                    .length
                : 0}
            </span>
          </button>
          <button
            onClick={() =>
              setDisp(
                test.filter((item) => item.rating < 3 && !item.isApproved),
              )
            }
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center cursor-pointer"
          >
            <p>Poor Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test
                ? test.filter((item) => item.rating < 3 && !item.isApproved)
                    .length
                : 0}
            </span>
          </button>
          <button
            onClick={() => setDisp(test.filter((item) => item.isApproved))}
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Published Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test ? test.filter((item) => item.isApproved).length : 0}
            </span>
          </button>
        </div>
      </div>
      <section className="flex w-screen justify-center gap-6 h-max">
        <div className="w-[34.65%]">
          <div className="w-full flex justify-between h-8">
            <p className="text-2xl">Recent Reviews</p>
            <Filter className="cursor-pointer" />
          </div>
          <div className="overflow-scroll flex flex-col gap-4 h-[60vh]">
            {disp.map((item) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  key={item.username + item.createdAt.toString()}
                  onClick={() => setCurrent(item)}
                  className="border-[#D1D1D1] border rounded-md p-4 pb-6 relative hover:cursor-pointer text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setCurrent(item);
                  }}
                >
                  <p>{options[5 - item.rating]}</p>
                  <p style={{ fontFamily: "Sofia Pro Ultralight" }}>
                    {truncateText(item.content, 175)}
                  </p>
                  <p className="absolute bottom-0 right-2">~{item.username}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[38%] flex flex-col items-center">
          {current && (
            <div className="relative  border-black border-[0.9px] py-6 pl-6 pr-16 h-[45vh] rounded-lg mt-8">
              <p className="text-2xl">{current.username}</p>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, id) => {
                  return (
                    <div
                      key={`${current.username}-${current.createdAt}-${id + 3}`}
                    >
                      {id < current.rating ? (
                        <Star fill="gold" strokeWidth={0.4} />
                      ) : (
                        <Star />
                      )}
                    </div>
                  );
                })}
                <p className="ml-4 text-lg">{options[5 - current.rating]}</p>
              </div>
              <p
                style={{ fontFamily: "Sofia Pro Ultralight" }}
                className="text-sm"
              >
                {formatReviewDate(current.createdAt)}
              </p>
              <p style={{ fontFamily: "Sofia Pro Light" }} className="mt-10">
                {current.content}
              </p>
            </div>
          )}
          <div className="gap-8 flex">
            {current && current.isApproved && (
              <button
                onClick={() => {
                  unpublish(current._id);
                }}
                disabled={publishing}
                style={{ fontFamily: "Sofia Pro Medium" }}
                className={`cursor-pointer px-4 py-1 bg-[#14342F] text-xl mt-4 text-white rounded-full border border-[#F2B263] ${publishing ? "opacity-75" : ""}`}
              >
                {publishing ? "Unpublishing" : "Unpublish"}
              </button>
            )}
            {current && !current.isApproved && (
              <button
                onClick={() => {
                  approve(current._id);
                }}
                disabled={publishing}
                style={{ fontFamily: "Sofia Pro Medium" }}
                className={`cursor-pointer px-4 py-1 bg-[#14342F] text-xl mt-4 text-white rounded-full border border-[#F2B263] ${publishing ? "opacity-75" : ""}`}
              >
                {publishing ? "Publishing" : "Publish"}
              </button>
            )}

            {current && (
              <button
                onClick={() => {
                  deleti(current._id);
                }}
                disabled={deleting}
                style={{ fontFamily: "Sofia Pro Medium" }}
                className={`cursor-pointer px-4 py-1 bg-[#780000] text-xl mt-4 text-white rounded-full border border-[#F2B263] ${deleting ? "opacity-75" : ""}`}
              >
                {deleting ? "Deleting" : "Delete"}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
