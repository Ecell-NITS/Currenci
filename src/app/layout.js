import { Suspense } from "react";
import ToastHandler from "./components/ToastHandler";
import "./globals.scss";
import Loading from "./loading";

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
