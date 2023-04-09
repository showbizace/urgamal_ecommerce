import Head from "next/head";
import React, { Children } from "react";
import Navbar from "../navbar";
import Search from "../search";
import BottomFooter from "../Footer";

export default function GlobalLayout({
  children,
  title = "Таримал Ургамал ХХК",
}) {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://kit.fontawesome.com/af91f056ad.css"
          crossorigin="anonymous"
        />
        <script
          src="https://kit.fontawesome.com/af91f056ad.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div id="myHeader" className="sticky mb-12 top-0 z-30 shadow bg-white">
        <Navbar />
        <Search />
        <main className="bg-main">{children}</main>
      </div>
    </div>
  );
}
