import Image from "next/image";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import { Button, Group, NavLink, Stack, Tabs, TextInput } from "@mantine/core";
import ProfileTabs from "../../components/ProfileTab";
import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import ProfileInfo from "./tabs/ProfileInfo";
import EmailPhone from "./tabs/EmailPhone";
import UserLocation from "./tabs/UserLocation";
import SavedOrder from "./tabs/SavedOrder";
import MyOrder from "./tabs/MyOrder";
import PurchaseHistory from "./tabs/PurchaseHistory";
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import {
	IconBox,
	IconLogout,
	IconMap2,
	IconUserCheck,
	IconUserEdit,
} from "@tabler/icons-react";
import UserBasicInfo from "@/components/UserProfileForms/UserBasicInfo";
import UserAddress from "@/components/UserProfileForms/UserAddress";
import { UserConfigContext } from "@/utils/userConfigContext";
const Profile = () => {
	const token = getCookie("token");
	const { logout } = useContext(UserConfigContext);
	const router = useRouter();
	const [activeTab, setActiveTab] = useState(0);
	const [userInfo, setUserInfo] = useState(null);
	const [addressData, setAddressData] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const { cr } = router.query;
		if (cr && cr === "order") {
			setActiveTab(1);
		}
		getUserInfo();
		getUserAddress();
	}, []);

	const getUserInfo = async () => {
		setLoading(true);
		if (!token) {
			router.push("/login");
		}
		const requestOption = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
			requestOption
		);
		if (res.status === 200) {
			const data = await res.json();
			if (data.success === true) {
				setUserInfo(data.data);
			}
		}
		setLoading(false);
	};

	const getUserAddress = async () => {
		setLoading(true);
		var requestOptions = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOptions)
			.then((req) => req.json())
			.then((res) => {
				if (res.success === true) {
					setLoading(false);
					setAddressData(res.data);
				}
			});
		setLoading(false);
	};

	const handleLogOut = () => {
		removeCookies("token");
		logout();
		router.replace("/");
	};

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
			color="yellow"
			variant="subtle"
			onClick={() => (index === 2 ? handleLogOut() : setActiveTab(index))}
			className="rounded-md"
		/>
	));

	return (
		<GlobalLayout>
			<div className="bg-grey-back h-[80vh] flex flex-grow items-stretch ">
				<Stack
					justify="space-between"
					className="bg-white min-w-[250px] my-4 ml-4 rounded-md px-3 py-2">
					<Stack spacing={"0.5rem"}>{items.slice(0, 2)}</Stack>
					{items[2]}
				</Stack>
				<div className="flex flex-grow px-4 py-4">
					{activeTab === 0 && (
						<Tabs
							defaultValue="info"
							variant="outline"
							classNames={{
								root: "bg-white  h-full w-full rounded-md px-4 py-2",
								panel: "mt-7 pl-6 flex-grow",
							}}>
							<Tabs.List>
								<Tabs.Tab value="info" icon={<IconUserEdit size="1rem" stroke={1.5} />}>
									Хувийн мэдээлэл
								</Tabs.Tab>
								<Tabs.Tab value="address" icon={<IconMap2 size="1rem" stroke={1.5} />}>
									Хүргэлтийн хаяг
								</Tabs.Tab>
							</Tabs.List>
							<Tabs.Panel value="info" className="mt-6">
								<UserBasicInfo
									key={userInfo?.toString()}
									data={userInfo}
									refresh={getUserInfo}
								/>
							</Tabs.Panel>
							<Tabs.Panel value="address" className="mt-6">
								<UserAddress data={addressData} refresh={getUserAddress} />
							</Tabs.Panel>
						</Tabs>
					)}
					{activeTab === 1 && <MyOrder />}
				</div>
			</div>
		</GlobalLayout>
	);
};

export default Profile;
