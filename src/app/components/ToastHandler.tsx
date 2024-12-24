"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastHandler() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const cookieMessage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("toastMessage="))
      ?.split("=")[1];

    if (cookieMessage) {
      setToastMessage(decodeURIComponent(cookieMessage));

      document.cookie = "toastMessage=; Max-Age=0; path=/";
    }
  }, []);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage, {
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
    }
  }, [toastMessage]);

  return <ToastContainer />;
}
