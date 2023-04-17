import Head from "next/head";
import React, { Children, useContext, useEffect, useState } from "react";
import Navbar from "../navbar";
import Search from "../search";
import BottomFooter from "../Footer";
import { isMobile } from 'react-device-detect';
import {
	Select,
	Tooltip,
} from "@mantine/core";
import { UserConfigContext } from "@/utils/userConfigContext";
import {
	IconHomeEco,
	IconReportSearch,
} from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
export default function GlobalLayout({
	children,
	footer = true,
	title = "Таримал Ургамал ХХК",
}) {

	const [type, setType] = useState()
	const userContext = useContext(UserConfigContext);
	const [userConfigValue, setUserConfigValue] = useState(userContext.preferenceConfig);
	const route = useRouter()
	useEffect(() => {
		setUserConfigValue(userContext.configId);
	}, [userContext.preferenceConfig, userContext.configId]);

	const getValue = (data) => {
		setType(data)
	}

	const handleConfigSelection = (value) => {
		if (userConfigValue !== value) {
			setCookie("preference_config", value, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
			});
			route.reload();
		}
	};

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
					crossorigin="anonymous"></script>
			</Head>
			<div className="sticky top-0 z-30 shadow bg-white">
				{/* <Search /> */}
				<main className="flex flex-col justify-between bg-main">

					<Navbar getValue={getValue} />
					{children}
					{footer && <BottomFooter />}
					{isMobile == true && type && <div className="sticky bottom-0 bg-white py-2 px-2 z-50">
						<Tooltip withArrow label="Танд зөвхөн уг төрлийн бараа, ангиллууд харагдана" style={{ width: "80%" }}>
							<Select
								// variant="filled"
								size="md"
								radius="xl"
								value={userConfigValue}
								onChange={(value) => handleConfigSelection(value)}
								// rightSection={<IconArrowsExchange2 size="1rem" />}
								// rightSectionWidth={30}
								// styles={{ rightSection: { pointerEvents: "none" } }}
								styles={(theme) => ({
									item: {
										"&[data-selected]": {
											"&, &:hover": {
												backgroundColor: "#f9bc60",
											},
										},

										// applies styles to hovered item (with mouse or keyboard)
										"&[data-hovered]": {},
									},
								})}
								data={
									type?.map((e) => {
										return {
											value: e.id?.toString(),
											label: e.name,
										};
									})
								}
								icon={
									userConfigValue === "1" ? (
										<IconHomeEco stroke={1.5} color="#204900" />
									) : (
										<IconReportSearch stroke={1.5} color="#5E4333" />
									)
								}
							/>
						</Tooltip>
					</div>}
				</main>
			</div>
		</div>
	);
}
