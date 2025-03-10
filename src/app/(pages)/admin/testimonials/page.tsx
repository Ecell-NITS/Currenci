"use client";

import { useEffect, useState } from "react";
import { Filter, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ITestimonial } from "../../../../model/Testimonial";
import NavbarAdmin from "../../../components/NavbarAdmin";

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
  const [unPublishedtest, setUnpublishedTest] = useState<ITestimonial[]>([]);
  const [disp, setDisp] = useState<ITestimonial[]>([]);
  const [current, setCurrent] = useState<ITestimonial | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [deleteTestimonial, setDeleteTestimonial] = useState(false);
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
    console.log(info);
    if (info.role !== "admin" && info.role !== "superadmin") {
      toast.error("You're not authenticated");
      setTimeout(() => {
        setPublishing(false);
        router.push("/");
      }, 1000);
      return;
    }
    fetch(`/api/v1/approveTestimonial?Id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("You're not autorized");
          return;
        }
        res.json();
      })
      .then(() => {
        const x = test.filter((item) => item._id !== id);
        const y = unPublishedtest.filter((item) => item._id !== id);
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
        setTest(x);
        setUnpublishedTest(y);
        setDisp(x);
        setCurrent(null);
      });
  };
  const deleteTest = async (id) => {
    setDeleteTestimonial(true);
    const resp = await fetch("/api/v1/getUser");
    const info = await resp.json();
    console.log(info);
    if (info.role !== "admin" && info.role !== "superadmin") {
      toast.error("You're not authenticated");
      setTimeout(() => {
        setDeleteTestimonial(false);
        router.push("/");
      }, 1000);
      return;
    }
    fetch(`/api/v1/deleteTestimonial?Id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("You're not autorized");
          return;
        }
        res.json();
      })
      .then(() => {
        const x = test.filter((item) => item._id !== id);
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
        setDeleteTestimonial(false);
        setTest(x);
        setDisp(x);
        setCurrent(null);
      });
  };

  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`/api/v1/getAllTestimonial`);
      const data = await res.json();
      setTest(data);
      const arr = data.filter((item: ITestimonial) => !item.isApproved);
      setUnpublishedTest(arr);
      setDisp(data);
    };
    fetchTest();
  }, []);

  return (
    <main
      className="bg-white w-screen min-h-screen flex flex-col pb-16"
      style={{ fontFamily: "Sofia Pro Light" }}
    >
      <NavbarAdmin />
      <div className="w-full px-[13vw] mt-44 mb-20">
        <div className="flex gap-4">
          <button
            onClick={() => setDisp(test)}
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Total Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test ? test.length : 0}
            </span>
          </button>
          <button
            onClick={() => setDisp(unPublishedtest)}
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Total Unpublished</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {unPublishedtest ? unPublishedtest.length : 0}
            </span>
          </button>
          <button
            onClick={() => setDisp(test.filter((item) => item.rating > 3))}
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Good Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test ? test.filter((item) => item.rating > 3).length : 0}
            </span>
          </button>
          <button
            onClick={() => setDisp(test.filter((item) => item.rating <= 3))}
            className="bg-[#1E3432] text-white px-4 py-2 flex gap-2 items-center cursor-pointer"
          >
            <p>Poor Reviews</p>
            <span className="rounded-full px-2 aspect-square flex justify-center items-center bg-white text-black">
              {test ? test.filter((item) => item.rating <= 3).length : 0}
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
          {current && (
            <div className="flex flex-row gap-4 items-center">
              <button
                onClick={() => {
                  approve(current._id);
                }}
                disabled={publishing || current.isApproved}
                style={{ fontFamily: "Sofia Pro Medium" }}
                className={` px-4 py-1 bg-[#14342F] text-xl mt-4 text-white rounded-full border border-[#F2B263] ${publishing || current.isApproved ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {current.isApproved ? "Published" : "Publish"}
              </button>
              <button
                onClick={() => {
                  deleteTest(current._id);
                }}
                disabled={deleteTestimonial}
                style={{ fontFamily: "Sofia Pro Medium" }}
                className={` px-4 py-1 bg-red-500 text-xl mt-4 text-white rounded-full border border-[#F2B263] ${deleteTestimonial ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {deleteTestimonial ? "Deleting" : "Delete"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
