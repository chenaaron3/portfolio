import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";

import "~/styles/globals.css";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${font.variable} scroll-smooth`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
