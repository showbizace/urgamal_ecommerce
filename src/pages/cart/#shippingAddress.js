import GlobalLayout from "@/pages/components/GlobalLayout/GlobalLayout";
import Link from "next/link";
import { Input, Select } from "@mantine/core";

const Address = () => {
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
      <div className="bg-white rounded-lg px-10 py-8">
        <div className="flex flex-row justify-between">
          <span className="font-[500] text-[1.3rem] text-[#212529]">
            Хаягийн Мэдээлэл
          </span>
          <div>Шинэ Хаяг Оруулах</div>
        </div>
        <div className="flex flex-col gap-6 mt-6 w-full">
          <div className="flex flex-row gap-6 w-full">
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
          <div className="flex flex-row gap-6  w-full">
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
          <div className="flex flex-row gap-6  w-full">
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
          <div className="flex flex-row gap-6  w-full">
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
      </div>
    </>
  );
};

export default Address;
