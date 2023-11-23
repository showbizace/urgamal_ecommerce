/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Chip,
  Chips,
  Text,
  Button,
  Skeleton,
  Select,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { IconCirclePlus, IconTruckOff } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import ProductModal from "@/components/Profile/ProfileModal";
import { UserConfigContext } from "@/utils/userConfigContext";

const Address = ({ setSelectedShippingData, setSelect }) => {
  const [value, setValue] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shippingData, setShippingData] = useState([]);
  const [editingProdData, setEditingProdData] = useState();
  const [cookie, setCookie] = useState();
  const { auth } = useContext(UserConfigContext);
  const [isAddAddress, setIsAddAddress] = useState(false);

  useEffect(() => {
    const cookie = getCookie("token");
    setCookie(cookie);
    getShippingData(cookie);
  }, [auth]);
  useEffect(() => {
    getShippingData();
    setSelectedShippingData(shippingData[1]);
    setValue(shippingData[1]);
  }, []);

  useEffect(() => {
    getShippingData(cookie);
  }, [isAddAddress]);

  const handleClick = () => {
    setIsAddAddress(!isAddAddress);
  };

  const getShippingData = async (cookie = cookie) => {
    console.log("called");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOptions)
      .then((req) => req.json())
      .then((res) => {
        if (res.success === true) {
          setShippingData(res.data);
          setLoading(false);
        }
      });
  };

  const openProductEditingModal = () => {
    setEditingProdData({ create: true });
    open();
  };

  const SubmitCreateShippingData = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const initialData = {
      name: values.name,
      city: values.city,
      province: values.province,
      district: values.district,
      committee: values.committee,
      street: values.street,
      fence: values.fence,
      apartment: values.apartment,
      number: values.number,
      phone: values.phone,
      type: values.type === undefined ? false : values.type,
      note: values.note,
    };

    console.log(initialData, "initialData");
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(initialData),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOption)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          showNotification({
            message: result.message,
            color: "green",
          });
          getShippingData();
          close;
        } else {
          showNotification({
            message: result.message,
            color: "red",
          });
        }
      });
  };

  return (
    <div className="bg-white rounded-lg lg:px-10 lg:py-8 mt-2 px-3 py-3 overflow-auto max-h-80">
      {!loading ? (
        <>
          <div className="flex flex-row justify-between">
            <span className="font-[500] lg:text-[1.3rem] text-sm text-[#212529]">
              Хаягийн Мэдээлэл
            </span>
            <Button
              leftIcon={<IconCirclePlus size={20} />}
              variant="subtle"
              compact
              onClick={(e) => {
                e.preventDefault();
                openProductEditingModal({}, "creation");
              }}
            >
              Шинэ хаяг нэмэх
            </Button>
          </div>
          <div className="flex flex-col gap-6 mt-6 w-full  overflow-auto">
            <div className="radio-button lg:px-5 gap-6 w-full px-2">
              <Card.Section
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                {shippingData?.length === 0 && (
                  <div className="flex flex-col w-full items-center gap-4 mt-6">
                    <IconTruckOff size="2rem" stroke={1.5} />
                    <span className="text-grey font-medium">
                      {" "}
                      Хаягийн мэдээлэл оруулаагүй байна
                    </span>
                  </div>
                )}
                {shippingData?.map((item, idx) => (
                  <div key={idx}>
                    <Chip.Group
                      multiple={false}
                      value={value}
                      onChange={() => setValue(item.id)}
                    >
                      <Card
                        shadow="sm"
                        sx={{ width: "100%", backgroundColor: "#5475ab0d" }}
                        className="cursor-pointer"
                        component="label"
                        onClick={() => {
                          setSelectedShippingData(item);
                          setSelect(true);
                        }}
                      >
                        <div className="flex flex-row lg:gap-6 items-center gap-3">
                          <Chip
                            value={item.id}
                            defaultChecked={value}
                            size="sm"
                          />
                          <div>
                            <Text
                              fz="md"
                              sx={(theme) => ({
                                "@media (max-width: 40em)": {
                                  fontSize: theme.fontSizes.sm,
                                },
                              })}
                            >
                              {item.city}-{item.district}-{item.committee}-
                              {item.street}-{item.apartment}-{item.number}
                            </Text>
                            <Text
                              fz="lg"
                              className="flex gap-1 mt-2"
                              sx={(theme) => ({
                                "@media (max-width: 40em)": {
                                  fontSize: theme.fontSizes.sm,
                                },
                              })}
                            >
                              Утас:
                              <Text
                                fz="lg"
                                fw={500}
                                sx={(theme) => ({
                                  "@media (max-width: 40em)": {
                                    fontSize: theme.fontSizes.sm,
                                  },
                                })}
                              >
                                {item.phone}
                              </Text>
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </Chip.Group>
                  </div>
                ))}
              </Card.Section>
            </div>
          </div>
        </>
      ) : (
        <Skeleton sx={{ height: "100%" }} visible={loading} />
      )}
      {console.log(editingProdData, "editing")}
      <ProductModal
        initialData={editingProdData}
        isOpen={opened}
        close={close}
        onSubmit={SubmitCreateShippingData}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Address;
