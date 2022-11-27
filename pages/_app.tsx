import type { AppProps } from "next/app";
import { useEffect } from "react";
import splitbee from "@splitbee/web";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    });
  }, []);

  return <Component {...pageProps} />;
}
