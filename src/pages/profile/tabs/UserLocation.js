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
import { useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";

const UserLocation = () => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);

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
  );
};

export default UserLocation;
