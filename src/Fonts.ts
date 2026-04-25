import localFont from "next/font/local";



export const shabnam = localFont({
  src: [
    {
      path: "./assets/shabnam-font-v5.0.1/Farsi-Digits/Shabnam-FD.ttf",
      weight: "400",  
      style: "regular",
    },
    {
      path: "./assets/shabnam-font-v5.0.1/Farsi-Digits/Shabnam-Medium-FD.ttf",
      weight: "500",  
      style: "medium",
    },
    {
      path: "./assets/shabnam-font-v5.0.1/Farsi-Digits/Shabnam-Bold-FD.ttf",
      weight: "700",  
      style: "bold",
    },
  ],
  variable: "--font-shabnam",
});