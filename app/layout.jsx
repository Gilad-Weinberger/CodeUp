import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weights: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "CodeUp - Boost your coding skills",
  description: "Boost your coding skills in ease with codeup",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className}`}>{children}</body>
    </html>
  );
}
