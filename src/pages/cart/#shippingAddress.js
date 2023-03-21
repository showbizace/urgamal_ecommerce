import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import { Card, Chip, Text } from "@mantine/core";
import { useState } from "react";

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
    id: 5,
  },
  {
    type: "Ажил",
    name: "rolla",
    oronnutag: false,
    street: "123",
    id: 6,
  },
  {
    type: "Ажил",
    name: "rolla",
    street: "123",
    oronnutag: false,
    id: 7,
  },
];

const Address = () => {
  const [value, setValue] = useState(1);

  return (
    <>
      {/* <div className="flex gap-2 ml-10">
            <Link href="cartItem" shallow={true}>
              Сагс
            </Link>
            <Link
              href="shippingAddress"
              className="text-red-500"
              shallow={true}
            >
              Хаяг
            </Link>
            <Link href="checkout" shallow={true}>
              Төлбөр
            </Link>
          </div> */}
      <div className="bg-white rounded-lg px-10 py-8 h-full">
        <div className="flex flex-row justify-between">
          <span className="font-[500] text-[1.3rem] text-[#212529]">
            Хаягийн Мэдээлэл
          </span>
          <div>Шинэ Хаяг Оруулах</div>
        </div>
        <div className="flex flex-col gap-6 mt-6 w-full h-3/5 overflow-auto">
          <div className="radio-button flex flex-row gap-6 w-full">
            <Card.Section
              sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {mockData.map((item, idx) => (
                <div>
                  <Chip.Group
                    multiple={false}
                    value={value}
                    onChange={() => setValue(item.id)}
                  >
                    <Card
                      key={idx}
                      shadow="sm"
                      sx={{ width: "100%" }}
                      className="cursor-pointer"
                      component="label"
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
      </div>
    </>
  );
};

export default Address;
