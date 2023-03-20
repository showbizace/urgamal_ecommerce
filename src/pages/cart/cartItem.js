import GlobalLayout from "@/pages/components/GlobalLayout/GlobalLayout";
import { Button, Checkbox, Table, ActionIcon } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import Magnifier from "../components/Magnifier/Magnifier";
import Address from "./#shippingAddress";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CartItems = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const { data, error, isLoading } = useSWR("/api/cartItem", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  console.log(isCheck);

  const handleClick = (e, Id) => {
    setIsCheck([e]);
    setIsCheck(isCheck.filter((item) => item !== e));
  };

  const ths = (
    <tr>
      <th className="py-10">
        <Checkbox
          value="selectAll"
          onClick={handleSelectAll}
          checked={isCheckAll}
        />
      </th>
      <th>Бараа</th>
      <th>Тоо Ширхэг</th>
      <th>Үнэ</th>
    </tr>
  );

  const rows = data.map((item, idx) => (
    <tr key={idx}>
      <td>
        <Checkbox
          value={isCheck.includes(item.Id)}
          id={item.id}
          onClick={(e) => handleClick(e, item.Id)}
          children={<div>asd </div>}
        />
      </td>
      <td>
        <div className="flex flex-row gap-8">
          <Magnifier
            imgSrc={"/bundle-1.svg"}
            imgWidth={80}
            imgHeight={80}
            magnifierRadius={50}
          />
          <div className="flex flex-col justify-around">
            <span className="font-[500] text-[1.002rem] text-[#212529]">
              {item.Name}
            </span>
            <span className="font-[500] text-[0.87rem] text-[#2125297a]">
              Хэмжээ:{" "}
              <span className="text-[#212529]">
                {item.Size ? item.Size : 2}
              </span>
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="inherit">
          <div className="flex items-center border border-[#21252923] rounded w-fit p-1">
            <ActionIcon
              sx={{
                ":hover": { backgroundColor: "#fff5f5" },
              }}
              className="mr-3"
            >
              <IconMinus size="1.2rem" color="#212529" />
            </ActionIcon>
            <span className="font-[500] text-[1rem] text-[#212529]">
              {item.qty ? item.qty : 2}
            </span>
            <ActionIcon
              sx={{
                ":hover": { backgroundColor: "#ebfbee" },
              }}
              className="ml-3"
            >
              <IconPlus size="1.2rem" color="#212529" />
            </ActionIcon>
          </div>
        </div>
      </td>
      <td>
        <span className="font-[600] text-[1rem] text-[#212529]">
          {item.ListPrice} ₮
        </span>
      </td>
    </tr>
  ));

  return (
    <>
      <GlobalLayout>
        <div className="bg-grey-back w-full px-32 py-8">
          {/* <div className="flex gap-2 ml-10">
            <Link href="cartItem" className="text-red-500" shallow={true}>
              Сагс
            </Link>
            <Link href="shippingAddress" shallow={true}>
              Хаяг
            </Link>
            <Link href="checkout" shallow={true}>
              Төлбөр
            </Link>
          </div> */}
          <div className="flex flex-row gap-10 mt-8">
            <div className="flex flex-col w-[70%] gap-8">
              <div>
                <div className=" bg-white rounded-lg px-10 py-6">
                  <div className="flex flex-row justify-between">
                    <span className="font-[500] text-[1.3rem] text-[#212529]">
                      Сагс
                    </span>
                    <div className="font-[400] text-[1rem] text-[#ff6868]"></div>
                    <Button
                      component="a"
                      href="#"
                      variant="subtle"
                      leftIcon={<IconTrash size="1rem" />}
                      color="red"
                    >
                      Устгах
                    </Button>
                  </div>
                  <div className="mt-6">
                    <Table captionSide="bottom" striped>
                      {/* <caption>Some elements from periodic table</caption> */}
                      <thead>{ths}</thead>
                      <tbody>{rows}</tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <Address />
            </div>

            <div className="w-[30%] h-2/5	bg-white rounded-lg px-10 py-8">
              <div className="flex flex-col gap-5">
                <span className="flex justify-between font-[400] text-[1.05rem] text-[#2125297a]">
                  Нийт үнэ
                  <span className="font-[500] text-[1.05rem] text-[#212529]">
                    123'222 ₮
                  </span>
                </span>
                <span className="flex justify-between font-[400] text-[1.05rem] text-[#2125297a]">
                  Хөнглөлт
                  <span className="font-[500] text-[1.05rem] text-[#212529]">
                    - 0 ₮
                  </span>
                </span>
                <span className="flex justify-between font-[400] text-[1.05rem] text-[#2125297a]">
                  Хүргэлт
                  <span className="font-[500] text-[1.05rem] text-[#212529]">
                    + 5'000 ₮
                  </span>
                </span>
                <hr className="h-px my-1 border-0 border-t-dashed bg-gray-300" />
                <span className="flex justify-between mb-1 font-[400] text-[1.1rem] text-[#212529af]">
                  Нийлбэр үнэ{" "}
                  <span className="font-[500] text-[1.1rem] text-[#212529]">
                    123'222 ₮
                  </span>
                </span>
                <Button
                  styles={(theme) => ({
                    root: {
                      backgroundColor: "#f9bc60",
                      border: 0,
                      height: 42,
                      paddingLeft: 20,
                      paddingRight: 20,
                    },

                    leftIcon: {
                      marginRight: 15,
                    },
                  })}
                  variant="filled"
                  radius="md"
                  size="md"
                  uppercase
                >
                  Захиалга хийх
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div>
              <span>Санал Болгох Бүтээгдэхүүн</span>
            </div>
          </div>
        </div>
      </GlobalLayout>
    </>
  );
};

export default CartItems;
