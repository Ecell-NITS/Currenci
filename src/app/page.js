"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToastHandler from "./components/ToastHandler";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/v1/getUser");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogOut = async () => {
    await fetch("/api/v1/signOut", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/signIn");
        console.log(data.message);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <ToastHandler />
      <h1>Home page</h1>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link href="/about">About</Link>
        <a href="/signIn">Sign in</a>
        <a href="/signUp">Sign up</a>
        {isAuthenticated && (
          <button
            onClick={handleLogOut}
            style={{
              textAlign: "left",
              width: "100px",
              backgroundColor: "black",
              color: "white",
              marginTop: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
