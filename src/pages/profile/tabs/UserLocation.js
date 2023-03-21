import {
  Button,
  Input,
  Switch,
  Select,
  useMantineTheme,
  Group,
  TextInput,
  Badge,
  Text,
  Card,
  Radio,
  Modal,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { getCookie } from "cookies-next";

const UserLocation = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [post, setPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [newShippingData, setNewShippingData] = useState({
    city: "Улаанбаатар",
    province: "",
    district: "",
    committee: "",
    street: "",
    fence: "Тест",
    apartment: "Тест",
    number: "5",
    phone: "8980676",
    type: true,
  });
  const cookie = getCookie("token");

  const mockData = [
    {
      type: "Гэр",
      name: "roll4",
      oronnutag: true,
      street: "123",
      id: 1,
    },
    {
      type: "Ажил",
      name: "roll3",
      street: "123",
      oronnutag: false,
      id: 2,
    },
    {
      type: "Гэр",
      name: "roll2",
      street: "123",
      oronnutag: true,
      id: 3,
    },
    {
      type: "Ажил",
      name: "rolla",
      street: "123",
      oronnutag: false,
      id: 4,
    },
    {
      type: "Ажил",
      name: "rolla",
      street: "123",
      oronnutag: true,
      id: 4,
    },
    {
      type: "Ажил",
      name: "rolla",
      oronnutag: false,
      street: "123",
      id: 4,
    },
    {
      type: "Ажил",
      name: "rolla",
      street: "123",
      oronnutag: false,
      id: 4,
    },
  ];

  const handleChange = (e, type) => {
    setNewShippingData({ ...newShippingData, [type]: e.target.value });
  };

  useEffect(() => {
    getShippingData();
    // if (post === true) {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Authorization", `Bearer ${cookie}`);

    //   var requestOptions = {
    //     method: "GET",
    //     headers: myHeaders,
    //     redirect: "follow",
    //   };
    //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //       if (result.success === true) {
    //         setData(result.data);
    //       }
    //     })
    //     .catch((error) => console.log("error", error));
    // }
  }, [post]);

  useEffect(() => {
    getShippingData();
    // if (post === true) {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Authorization", `Bearer ${cookie}`);

    //   var requestOptions = {
    //     method: "GET",
    //     headers: myHeaders,
    //   };
    //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //       if (result.success === true) {
    //         setData(result.data);
    //       }
    //     })
    //     .catch((error) => console.log("error", error));
    // }
  }, [data]);

  const getShippingData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/address`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result.success === true) {
          setLoading(true);
          if (!loading) {
            setData(result.data);
          }
        }
      });
  };

  const SubmitShippingData = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newShippingData),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/address`,
      requestOption
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          setPost(true);
          close;
        } else {
          setPost(false);
        }
      });
  };

  console.log(data);

  return (
    <div style={{ width: "72.5%" }} className="flex flex-col">
      <div className=" bg-white ml-8 w-full rounded-md py-4 px-12 ">
        <div className="flex flex-row justify-between">
          <p className="font-[500] text-[1.3rem] text-[#212529]">Хаяг</p>

          <Group position="center">
            <Button
              leftIcon={<IconCirclePlus size={20} />}
              variant="subtle"
              compact
              onClick={open}
            >
              Шинэ хаяг нэмэх
            </Button>
          </Group>
        </div>

        <div className="flex flex-col gap-6 my-3 w-full overflow-auto">
          <Group>
            <div className="flex my-4 gap-6">
              {mockData.map((item, idx) => (
                <div key={idx}>
                  <Card
                    shadow="sm"
                    padding="sm"
                    radius="md"
                    sx={{ width: "320px" }}
                    withBorder
                  >
                    <div className="flex flex-col items-start gap-3 w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row justify-between items-center">
                          <Text fw={500}>{item.type}</Text>
                          {item.oronnutag ? (
                            <Badge color="teal" variant="filled">
                              Орон нутаг
                            </Badge>
                          ) : (
                            " "
                          )}
                        </div>
                        <Text fw={500}>{item.name}</Text>
                      </div>
                      {/* <Radio value={item.id} /> */}
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex flex-row justify-between gap-20 w-full">
                          <Text fz="md" c="dimmed" className="flex flex-row ">
                            Хот / Аймаг:
                          </Text>
                          <Text fz="md">{item.street}</Text>
                        </div>
                        <div className="flex flex-row justify-between gap-20 w-full">
                          <Text fz="md" c="dimmed" className="flex flex-row ">
                            Дүүрэг:
                          </Text>
                          <Text fz="md">{item.street}</Text>
                        </div>
                        <div className="flex flex-row justify-between gap-20 w-full">
                          <Text fz="md" c="dimmed" className="flex flex-row ">
                            Хороо:
                          </Text>
                          <Text fz="md">{item.street}</Text>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                          <Text fz="md" c="dimmed" className="flex flex-row ">
                            Гудамж, хороолол:
                          </Text>
                          <Text fz="md">{item.street}</Text>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                          <Text fz="md" c="dimmed" className="flex flex-row ">
                            Хашаа, байр:
                          </Text>
                          <Text fz="md">{item.street}</Text>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mt-4 gap-8 justify-center">
                      <Button variant="subtle" color="red">
                        Устгах
                      </Button>
                      <Button variant="light" color="yellow">
                        Засах
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </Group>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Шинэ хаяг нэмэх" size="xl">
        <div className="bg-white w-full rounded-md py-4 px-4">
          <div className="flex flex-row justify-between mb-6">
            <div className="mt-1">
              <Switch
                checked={checked}
                label="Орон нутаг"
                onChange={(event) => {
                  setChecked(event.currentTarget.checked),
                    setNewShippingData({ type: event.currentTarget.checked });
                }}
                color="teal"
                size="sm"
              />
            </div>
          </div>

          <div className="mb-5 flex flex-row w-full gap-12">
            <Select
              className="w-full"
              label="Хот/Аймаг"
              placeholder="Хот / Аймаг сонгоно уу."
              required
              onChange={(e) => {
                setNewShippingData({ ...newShippingData, city: e });
              }}
              defaultValue={"Улаанбаатар"}
              data={[
                {
                  value: "Улаанбаатар",
                  label: "Улаанбаатар",
                  group: "Хот",
                },
                {
                  value: "Дархан",
                  label: "Дархан",
                  group: "Хот",
                },
                {
                  value: "Дундговь",
                  label: "Дундговь",
                  group: "Аймаг",
                },
                {
                  value: "Дорнод",
                  label: "Дорнод",
                  group: "Аймаг",
                },
              ]}
            />
            <Input.Wrapper
              className="w-full"
              id="input-demo"
              value={newShippingData.district}
              withAsterisk
              onChange={(e) => handleChange(e, "district")}
              label="Дүүрэг / Сум"
            >
              <Input id="input-demo" />
            </Input.Wrapper>
          </div>
          <div className="flex flex-row gap-12 mb-5  w-full">
            <Input.Wrapper
              className="w-full"
              id="input-demo"
              value={newShippingData.committee}
              withAsterisk
              onChange={(e) => handleChange(e, "committee")}
              label="Хороо / Баг"
            >
              <Input id="input-demo" />
            </Input.Wrapper>
            <Input.Wrapper
              className="w-full"
              id="input-demo"
              value={newShippingData.street}
              withAsterisk
              onChange={(e) => handleChange(e, "street")}
              label="Гудамж"
            >
              <Input id="input-demo" />
            </Input.Wrapper>
            <Input.Wrapper
              className="w-full"
              id="input-demo"
              value={newShippingData.apartment}
              withAsterisk
              onChange={(e) => handleChange(e, "apartment")}
              label="Байр / Байгуулга"
            >
              <Input id="input-demo" />
            </Input.Wrapper>
            <Input.Wrapper
              className="w-full"
              id="input-demo"
              value={newShippingData.number}
              withAsterisk
              onChange={(e) => handleChange(e, "number")}
              label="Тоот"
            >
              <Input id="input-demo" />
            </Input.Wrapper>
          </div>
          <div className="flex flex-row gap-12 mb-5  w-full">
            <Input.Wrapper
              className="w-full"
              id="input-demo"
              value={newShippingData.phone}
              withAsterisk
              onChange={(e) => handleChange(e, "phone")}
              label="Утасны дугаар"
            >
              <Input id="input-demo" />
            </Input.Wrapper>
          </div>
        </div>
        <div className="flex flex-row justify-end mt-4 w-full">
          <Button
            variant={"outline"}
            color={"red"}
            style={{ fontWeight: "normal" }}
            onClick={close}
          >
            Арилгах
          </Button>
          <Button
            variant={"filled"}
            className="ml-4"
            onClick={(e) => SubmitShippingData(e)}
            style={{ backgroundColor: "#F9BC60", fontWeight: "normal" }}
          >
            Хадгалах
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserLocation;
