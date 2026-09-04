import localFont from "next/font/local";

export const upanddownNormal = localFont({
  src: [
    {
      path: "../../assets/fonts/UpAndDown.ttf",
      weight: "400",
    },
  ],
  variable: "--font-upanddownnormal",
  display: "swap",
});
export const poppins = localFont({
  src: [
    {
      path: "../../assets/fonts/poppins/Poppins-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});
