import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Router from "next/router";

import ProgressBar from "@badrap/bar-of-progress";

function MyApp({ Component, pageProps }) {
  const progress = new ProgressBar({
    size: 4,
    color: "#FE595E",
    className: "z-50",
    delay: 100,
  });

  // ProgressBar 를 next.js 에 연결
  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
