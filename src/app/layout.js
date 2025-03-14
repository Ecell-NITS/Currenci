import ToastHandler from "./components/ToastHandler";
import "./globals.scss";

export const metadata = {
  title: "Currenci",
  description:
    "Currenci is a cutting-edge financial company providing innovative solutions to help you manage, grow, and optimize your finances.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastHandler />
      </body>
    </html>
  );
}
