import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "VibeChat — Chat Smarter, Connect Better",
  description:
    "VibeChat is a fast, secure, and beautifully simple messaging app for friends, family, and teams. Chat in real time across iOS, Web, and Desktop.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className={`${poppins.className} h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
