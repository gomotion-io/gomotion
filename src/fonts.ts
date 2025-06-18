import localFont from "next/font/local";

export const foundersGroteskBold = localFont({
  src: [
    {
      path: "../public/fonts/founders-grotesk/TestFoundersGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-founders-grotesk",
});
