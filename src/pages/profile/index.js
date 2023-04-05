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
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  IconActivity,
  IconBox,
  IconChevronRight,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLocation,
  IconLogout,
  IconMap2,
  IconShip,
  IconUserCheck,
  IconUserEdit,
} from "@tabler/icons-react";
import { UserContext } from "@/utils/userContext";
import UserBasicInfo from "@/components/UserProfileForms/UserBasicInfo";
import UserAddress from "@/components/UserProfileForms/UserAddress";
const Profile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    setLoading(true);
    const token = getCookie("token");
    console.log(token);
    if (!token) {
      router.push("/login");
    }
    const requestOption = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
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
  const handleLogOut = () => {
    removeCookies("token");
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
      onClick={() => (index === 2 ? handleLogOut() : setActiveTab(index))}
      className="rounded-md"
    />
  ));

  return (
    <GlobalLayout>
      <div className="bg-grey-back flex flex-grow items-stretch ">
        <Stack
          justify="space-between"
          className="bg-white min-w-[250px] my-4 ml-4 rounded-md px-3 py-2"
        >
          <Stack spacing={"0.5rem"}>{items.slice(0, 2)}</Stack>
          {items[2]}
        </Stack>
        <div className="flex flex-grow px-4 py-4">
          {activeTab === 0 && (
            <Tabs
              defaultValue="info"
              variant="outline"
              classNames={{
                root: "bg-white w-full rounded-md px-4 py-2",
                panel: "mt-7  pl-6 h-full flex-grow",
              }}
            >
              <Tabs.List>
                <Tabs.Tab
                  value="info"
                  icon={<IconUserEdit size="1.3rem" stroke={1.5} />}
                >
                  Хувийн мэдээлэл
                </Tabs.Tab>
                <Tabs.Tab
                  value="address"
                  icon={<IconMap2 size="1.3rem" stroke={1.5} />}
                >
                  Хүргэлтийн хаяг
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="info" className="mt-6">
                <UserBasicInfo data={userInfo} />
              </Tabs.Panel>
              <Tabs.Panel value="address" className="mt-6">
                <UserAddress />
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
