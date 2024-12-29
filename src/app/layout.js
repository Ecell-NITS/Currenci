import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ToastHandler from "./components/ToastHandler";
import "./globals.scss";

export const metadata = {
  title: "Currenci",
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
