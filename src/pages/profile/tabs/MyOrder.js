import { useMemo, useState } from "react";
import { Loader, Modal, Tabs, Text, TextInput } from "@mantine/core";
import Order from "../../../components/Profile/Order";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import axios from "axios";
import { IconPackageOff } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const MyOrder = () => {
  const [tabs, setTabs] = useState("all");
  const accessToken = getCookie("token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const fetcher = (url) => axios.get(url, config).then((res) => res.data.data);
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/order?status=${tabs === "all" ? "" : tabs
    }`,
    fetcher
  );

  // useEffect(() => {
  // }, []);
  const orderTypes = useMemo(
    () => [
      { value: "all", title: "Бүгд" },
      { value: "100", title: "Үүссэн" },
      { value: "200", title: "Төлбөр хийгдсэн" },
      { value: "201", title: "Хүлээн авсан" },
      { value: "301", title: "Цуцалсан" },
    ],
    []
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [paymentData, setPaymentData] = useState();
  return (
    <Tabs
      variant="outline"
      value={tabs}
      onTabChange={setTabs}
      classNames={{
        root: "bg-white w-full rounded-md px-4 py-2 overflow-y-auto",
        panel: "my-4 pl-2 flex-grow h-full ",
      }}
    >
      <Tabs.List>
        {orderTypes.map((e) => (
          <Tabs.Tab key={e.title} value={e.value}>
            {e.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {orderTypes.map((e) => (
        <Tabs.Panel key={e.title} value={e.value}>
          {isLoading && (
            <div className="h-full w-full flex items-center justify-center">
              <Loader color="yellow" variant="dots" />
            </div>
          )}
          {orders && orders.length === 0 ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="flex flex-col gap-2 items-center">
                <IconPackageOff size={"3rem"} stroke={1.2} />
                <Text span weight={500}>
                  {orderTypes.find((types) => types.value === e.value).title}
                </Text>
                <Text size="sm">захиалга одоогоор байхгүй байна</Text>
              </div>
            </div>
          ) : (
            orders?.map((e, index) => {
              return <Order data={e} key={index} />;
            })
          )}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default MyOrder;
