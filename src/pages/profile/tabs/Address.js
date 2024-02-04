/* eslint-disable react-hooks/exhaustive-deps */
import ShippingAddressCard from "@/components/ShippingAddressCard/ShippingAddressCard";
import UserAddress from "@/components/UserProfileForms/UserAddress";
import { fetchMethod } from "@/utils/fetch";
import {
  Button,
  Center,
  Loader,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCircleXFilled, IconPlus } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Address = () => {
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    const { cr } = router.query;
    if (cr && cr === "order") {
      setActiveTab(1);
    }
    getUserAddress();
  }, []);

  const getUserAddress = async () => {
    setLoading(true);
    const data = await fetchMethod("GET", "user/address", token);
    if (data.success) {
      setAddressData(data?.data);
      setLoading(false);
    } else {
      showNotification({
        message: data.message,
        color: "red",
        icon: (
          <IconCircleXFilled
            style={{
              width: rem(30),
              height: rem(30),
            }}
          />
        ),
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      {loading ? (
        <div className="w-full h-56 flex items-center justify-center">
          <Loader color="yellow" />
        </div>
      ) : (
        <div>
          <Title order={3}>Хүргэлтийн хаяг</Title>
          <Text size="sm" c="dimmed">
            Та хүргэлтийн хаягаа оруулж захиалгаа хялбар хийгээрэй
          </Text>
          <div className="w-full">
            <UserAddress data={addressData} refresh={getUserAddress} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
