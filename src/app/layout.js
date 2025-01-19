import "./globals.scss";
import { Suspense } from "react";
import Loading from "./loading";
import ToastHandler from "./components/ToastHandler";

export const metadata = {
  title: "Currenci",
  description:
    "Currenci is a cutting-edge financial company providing innovative solutions to help you manage, grow, and optimize your finances.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <ToastHandler />
      </body>
    </html>
  );
}
