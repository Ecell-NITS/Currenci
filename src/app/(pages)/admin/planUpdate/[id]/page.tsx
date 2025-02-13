"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const planUpdate = () => {
  const params = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");

  const updatePlan = async () => {
    const resp = await fetch("/api/v1/getUser");
    const info = await resp.json();
    if (info.role !== "admin" || info.role !== "superadmin") {
      toast.error("You're not authenticated");
      setTimeout(() => {
        router.push("/");
      }, 1000);
      return;
    }
    const res = await fetch(`/api/v1/updatePlan/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, days, price }),
    });
    const data = await res.json();
    if (data.status !== 403) {
      toast.success("Plan Successfully edited");
      router.push("/pricing");
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await fetch(`/api/v1/getPlan/${params.id}`);
      const data = await res.json();
      setName(data.plan.name);
      setPrice(data.plan.price);
      setDays(data.plan.days);
    };
    fetchPlan();
  }, [params.id]);

  return (
    <main
      className="bg-white w-screen min-h-screen flex flex-col justify-center pb-16"
      style={{ fontFamily: "Sofia Pro Regular" }}
    >
      <div className="h-max w-[50%] ml-[20%]">
        <div className="flex gap-5 h-max text-5xl items-center mb-20">
          <button
            className="border rounded-full p-1 h-max aspect-square border-[#A48111] text-[#A48111] felx items-center"
            onClick={() => router.back()}
          >
            <ChevronLeft />
          </button>
          <h1>Plan Update</h1>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between text-3xl">
            <p>Plan Name:</p>
            <input
              placeholder="plan name"
              className="updateInput border border-[#D1D1D1] py-2 px-3 w-[45%] rounded-md text-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-3xl">
            <p>Number of working days:</p>
            <input
              placeholder="plan name"
              className="updateInput border border-[#D1D1D1] py-2 px-3 w-[45%] rounded-md text-lg"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-3xl">
            <p>Pricing of Plan:</p>
            <input
              placeholder="plan name"
              className="updateInput border border-[#D1D1D1] py-2 px-3 w-[45%] rounded-md text-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            className="cursor-pointer px-[4vw] py-[1vw] bg-[#14342F] md:text-3xl text-xl text-white rounded-full w-[25%]"
            onClick={() => updatePlan()}
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default planUpdate;
