import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ToastHandler from "./components/ToastHandler";
import "./globals.scss";

export const metadata = {
  title: "Currenci",
  description:
    "Get to know our services and how we can help you with your financial needs.",
  openGraph: {
    title: "Currenci",
    description:
      "Get to know our services and how we can help you with your financial needs.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <ToastHandler />
      </body>
    </html>
  );
}
