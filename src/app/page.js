"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ToastHandler from "./components/ToastHandler";

export default function Home() {
  const router = useRouter();

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
      <Link href="/about">About</Link>
      <br />
      <Link href="/team">Team Page</Link> <br />
      <Link href="/developers">Developers Page</Link>
      <br />
      <Link href="/feedback">Feedback Page</Link>
    </div>
  );
}
