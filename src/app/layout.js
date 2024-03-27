import { Inter } from "next/font/google";
import "./home.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Storb.lol | Loja",
  description: "Envie presentes para seus amigos gratuitamente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
