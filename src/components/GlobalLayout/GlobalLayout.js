import Head from "next/head";
import React, { Children } from "react";
import BottomFooter from "../Footer";
import Navbar from "../navbar";
import Search from "../search";

export default function GlobalLayout({ children, title = "Таримал Ургамал ХХК" }) {
	return (
		<div className="body">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
					rel="stylesheet"
				/>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="description" content={title} />
				<link
					rel="stylesheet"
					href="https://kit.fontawesome.com/af91f056ad.css"
					crossOrigin="anonymous"
				/>
				<script
					src="https://kit.fontawesome.com/af91f056ad.js"
					crossOrigin="anonymous"></script>
			</Head>
			<body className="flex flex-col min-h-screen">
				<div id="myHeader" className="sticky top-0 z-30 shadow bg-white">
					<Navbar />
					<Search />
				</div>
				<main className="bg-main flex-grow">{children}</main>
				<BottomFooter />
			</body>
		</div>
	);
}
