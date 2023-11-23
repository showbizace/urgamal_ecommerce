/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  NavLink,
  Stack,
  Tabs,
  TextInput,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import MyOrder from "./tabs/MyOrder";
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
  const [sorryForUsingStateForThis, setSorry] = useState(false);
  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
    function updateSize() {
      setSorry(window.innerWidth > 640);
    }
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
      label: <span className="text-red-400">Системээс гарах</span>,
    },
  ];
  const items = data.map((item, index) => (
    <>
      {index === 2 ? <Divider color="gray.2" w="100%" /> : null}
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
    </>
  ));

  return (
    <GlobalLayout footer={false}>
      <div className="bg-grey-back h-[100vh] flex flex-col sm:flex-row flex-grow items-stretch">
        <div className="flex flex-row sm:flex-col items-center sm:items-start bg-white w-[94%] sm:w-[250px] mb-0 mt-4 sm:mb-4 sm:mt-4 ml-4 rounded-md px-3 py-2">
          <div className="w-full flex flex-row sm:flex-col grow sm:grow-0 items-center gap-2">
            {items}
          </div>
          {/* <div>
            {sorryForUsingStateForThis ? (
              items[2]
            ) : (
              <span className="text-red-400">
                <Button
                  leftIcon={
                    <IconLogout color="red" size="1.625rem" stroke={1.5} />
                  }
                  variant="subtle"
                  size="xs"
                >
                  Системээс гарах
                </Button>
              </span>
            )}
          </div> */}
        </div>
        <div className="h-full flex flex-grow px-4 py-4 ">
          {activeTab === 0 && (
            <Tabs
              defaultValue="info"
              variant="outline"
              classNames={{
                root: "bg-white  h-full w-full rounded-md px-4 py-2 overflow-y-auto",
                panel: "mt-7 pl-6 flex-grow",
              }}
            >
              <Tabs.List>
                <Tabs.Tab
                  value="info"
                  icon={<IconUserEdit size="1rem" stroke={1.5} />}
                >
                  Хувийн мэдээлэл
                </Tabs.Tab>
                <Tabs.Tab
                  value="address"
                  icon={<IconMap2 size="1rem" stroke={1.5} />}
                >
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
