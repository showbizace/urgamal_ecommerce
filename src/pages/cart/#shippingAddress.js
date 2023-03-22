import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import {
  Card,
  Chip,
  Text,
  Button,
  Modal,
  Switch,
  Skeleton,
  Select,
  Input,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { getCookie } from "cookies-next";
const cookie = getCookie("token");

const Address = () => {
  const [value, setValue] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shippingData, setShippingData] = useState([]);
  const [selectedShippingData, setSelectedShippingData] = useState({});

  useEffect(() => {
    getShippingData();
  }, []);

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
      .then((req) => req.json())
      .then((res) => {
        if (res.success === true) {
          setLoading(false);
          setShippingData(res.data);
        }
      });
  };

  return (
    <>
      <div className="bg-white rounded-lg px-10 py-8 h-[530px]">
        {!loading ? (
          <>
            <div className="flex flex-row justify-between">
              <span className="font-[500] text-[1.3rem] text-[#212529]">
                Хаягийн Мэдээлэл
              </span>
              <Button
                leftIcon={<IconCirclePlus size={20} />}
                variant="subtle"
                compact
                onClick={open}
              >
                Шинэ хаяг нэмэх
              </Button>
            </div>
            <div className="flex flex-col gap-6 mt-6 w-full h-[88%] overflow-auto">
              <div className="radio-button px-5 gap-6 w-full">
                <Card.Section
                  sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
                >
                  {shippingData?.map((item, idx) => (
                    <div>
                      <Chip.Group
                        multiple={false}
                        value={value}
                        onChange={() => setValue(item.id)}
                      >
                        <Card
                          key={idx}
                          shadow="sm"
                          sx={{ width: "100%", backgroundColor: "#5475ab0d" }}
                          className="cursor-pointer"
                          component="label"
                          onClick={() => setSelectedShippingData(item)}
                        >
                          <div className="flex flex-row gap-6 items-center">
                            <Chip className="asdasd" value={item.id}></Chip>
                            <div>
                              <Text fw={500}>{item.type}</Text>
                              <Text fw={500}>{item.name}</Text>
                              <Text fz="md">
                                Ulaanbaatar, sukhbaatar, 9-r khoroo, 289, 6 toot
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
        <Modal
          opened={opened}
          onClose={close}
          title="Шинэ хаяг нэмэх"
          size="xl"
        >
          <div className="bg-white w-full rounded-md py-4 px-4">
            <div className="flex flex-row justify-between mb-6">
              <div className="mt-1">
                <Switch
                  checked={checked}
                  label="Орон нутаг"
                  onChange={(event) => setChecked(event.currentTarget.checked)}
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
                defaultValue={1}
                data={[
                  {
                    value: 1,
                    label: "Улаанбаатар",
                    group: "Хот",
                  },
                  {
                    value: 2,
                    label: "Дархан",
                    group: "Хот",
                  },
                  {
                    value: 3,
                    label: "Дундговь",
                    group: "Аймаг",
                  },
                  {
                    value: 4,
                    label: "Дорнод",
                    group: "Аймаг",
                  },
                ]}
              />
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Дүүрэг / Сум"
              >
                <Input id="input-demo" />
              </Input.Wrapper>
            </div>
            <div className="flex flex-row gap-12 mb-5  w-full">
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Хороо / Баг"
              >
                <Input id="input-demo" />
              </Input.Wrapper>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Байр / Байгуулга"
              >
                <Input id="input-demo" />
              </Input.Wrapper>
            </div>
            <div className="flex flex-row gap-12 mb-5  w-full">
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Хороо / Баг"
              >
                <Input id="input-demo" />
              </Input.Wrapper>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Байр / Байгуулга"
              >
                <Input id="input-demo" />
              </Input.Wrapper>
            </div>
            <div className="flex flex-row gap-12 mb-5  w-full">
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Орц / Хаалга"
              >
                <Input id="input-demo" />
              </Input.Wrapper>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Байр / Байгуулга"
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
              style={{ backgroundColor: "#F9BC60", fontWeight: "normal" }}
            >
              Хадгалах
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Address;
