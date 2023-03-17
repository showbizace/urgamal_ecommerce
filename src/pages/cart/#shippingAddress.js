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
            Хаягийн мэдээлэл
          </span>
          <div>Шинээр эхлэх</div>
        </div>
        <div className="flex flex-row gap-6 mt-6 w-full">
          <Select
            className="w-full"
            label="Your favorite Rick and Morty character"
            placeholder="Pick one"
            required
            data={[
              {
                value: "rick",
                label: "Rick",
                group: "Used to be a pickle",
              },
              {
                value: "morty",
                label: "Morty",
                group: "Never was a pickle",
              },
              {
                value: "beth",
                label: "Beth",
                group: "Never was a pickle",
              },
              {
                value: "summer",
                label: "Summer",
                group: "Never was a pickle",
              },
            ]}
          />
          <Input.Wrapper
            className="w-full"
            id="input-demo"
            withAsterisk
            label="Credit card information"
          >
            <Input id="input-demo" placeholder="Your email" />
          </Input.Wrapper>
        </div>
      </div>
    </>
  );
};

export default Address;
