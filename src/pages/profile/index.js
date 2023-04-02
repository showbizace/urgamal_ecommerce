import Image from "next/image";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import { Button, NavLink, TextInput } from "@mantine/core";
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
	IconChevronRight,
	IconFingerprint,
	IconGauge,
	IconHome2,
	IconUserCheck,
} from "@tabler/icons-react";
import { UserContext } from "@/utils/userContext";
const Profile = () => {
	const router = useRouter();
	const [tabs, setTabs] = useState(1);
	const [activeTab, setActiveTab] = useState(0);
	const userInfo = useContext(UserContext);
	const onClickTabs = (e) => {
		setTabs(e);
	};
	const data = [
		{
			icon: IconUserCheck,
			label: "Хувийн мэдээлэл",
		},
		{
			icon: IconFingerprint,
			label: "Security",
			rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
		},
		{ icon: IconActivity, label: "Activity" },
	];
	const items = data.map((item, index) => (
		<NavLink
			key={item.label}
			active={index === activeTab}
			label={item.label}
			description={item.description}
			rightSection={item.rightSection}
			icon={<item.icon size="1rem" stroke={1.5} />}
			onClick={() => setActiveTab(index)}
		/>
	));
	useEffect(() => {
		console.log(userInfo, "userInfo");
		window.dispatchEvent(new Event("storage"));
	}, []);

	return (
		<GlobalLayout>
			<div className="bg-grey-back w-full px-20 py-8 h-full">
				<div className=" mt-6 flex flex-row h-full">
					<div className="bg-white rounded-md min-w-[400px]  h-full">{items}</div>
					{tabs === 1 && <ProfileInfo />}
					{tabs === 2 && <EmailPhone />}
					{tabs === 3 && <UserLocation />}
					{tabs === 4 && <SavedOrder />}
					{tabs === 5 && <MyOrder />}
					{tabs === 6 && <PurchaseHistory />}
				</div>
			</div>
		</GlobalLayout>
	);
};

export default Profile;
