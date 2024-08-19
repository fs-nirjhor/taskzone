import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
