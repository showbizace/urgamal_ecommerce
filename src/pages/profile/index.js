import Image from "next/image";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import { Button, Group, NavLink, Stack, TextInput } from "@mantine/core";
import ProfileTabs from "../../components/ProfileTab";
import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import ProfileInfo from "./tabs/ProfileInfo";
import EmailPhone from "./tabs/EmailPhone";
import UserLocation from "./tabs/UserLocation";
import SavedOrder from "./tabs/SavedOrder";
import MyOrder from "./tabs/MyOrder";
import PurchaseHistory from "./tabs/PurchaseHistory";
import BottomFooter from "../../components/Footer";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
	IconActivity,
	IconBox,
	IconChevronRight,
	IconFingerprint,
	IconGauge,
	IconHome2,
	IconLogout,
	IconUserCheck,
} from "@tabler/icons-react";
import { UserContext } from "@/utils/userContext";
const Profile = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState(0);
	const userInfo = useContext(UserContext);

	const data = [
		{
			icon: <IconUserCheck size="1.3rem" stroke={1.5} />,
			label: "Хувийн мэдээлэл",
		},
		{
			icon: <IconBox size="1.3rem" stroke={1.5} />,
			label: "Захиалга",
		},
		{
			icon: <IconLogout color="red" size="1.3rem" stroke={1.5} />,
			label: "Системээс гарах",
		},
	];
	const items = data.map((item, index) => (
		<NavLink
			key={item.label}
			active={index === activeTab}
			label={item.label}
			description={item.description}
			rightSection={item.rightSection}
			icon={item.icon}
			onClick={() => setActiveTab(index)}
		/>
	));
	useEffect(() => {
		console.log(userInfo, "userInfo");
		window.dispatchEvent(new Event("storage"));
	}, []);

	return (
		<GlobalLayout>
			<div className="bg-grey-back flex flex-grow items-stretch ">
				<Stack justify="space-between" className="bg-white rounded-md min-w-[250px] ">
					<div>{items.slice(0, 2)}</div>
					{items[2]}
				</Stack>
				<div className="flex flex-grow px-10 py-6">
					{activeTab === 0 && <ProfileInfo />}
					{activeTab === 1 && <UserLocation />}
				</div>
			</div>
		</GlobalLayout>
	);
};

export default Profile;
