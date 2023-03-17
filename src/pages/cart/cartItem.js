import GlobalLayout from "@/pages/components/GlobalLayout/GlobalLayout";
import { Button, Checkbox, Image, Table } from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";
import Magnifier from "../components/Magnifier/Magnifier";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CartItems = () => {
  const { data, error, isLoading } = useSWR("/api/cartItem", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const ths = (
    <tr>
      <th>
        <Checkbox />
      </th>
      <th>Бараа</th>
      <th>Тоо Ширхэг</th>
      <th>Үнэ</th>
    </tr>
  );

  const rows = data.map((item, idx) => (
    <tr key={idx}>
      <td>
        <Checkbox />
      </td>
      <td>
        <div className="flex flex-row">
          <Magnifier
            imgSrc={"/bundle-1.svg"}
            imgWidth={80}
            imgHeight={80}
            magnifierRadius={50}
          />
          <div className="flex flex-col">
            <span>{item.Name}</span>
            <span>
              Хэмжээ: <span>{item.Size ? item.Size : 2}</span>
            </span>
          </div>
        </div>
      </td>
      <td>{item.qty ? item.qty : 2}</td>
      <td>{item.ListPrice}</td>
    </tr>
  ));

  return (
    <>
      <GlobalLayout>
        <div className="bg-grey-back w-full px-32 py-8">
          <div className="flex gap-2 ml-10">
            <Link href="cartItem" className="text-red-500" shallow={true}>
              Сагс
            </Link>
            <Link href="shippingAddress" shallow={true}>
              Хаяг
            </Link>
            <Link href="checkout" shallow={true}>
              Төлбөр
            </Link>
          </div>
          <div className="flex flex-row gap-10 mt-8">
            <div className="w-[70%] bg-white rounded-lg px-10 py-8">
              <div className="flex flex-row justify-between">
                <span>Сагс</span>
                <div>Устгах</div>
              </div>
              <div className="mt-4">
                <Table captionSide="bottom">
                  <caption>Some elements from periodic table</caption>
                  <thead>{ths}</thead>
                  <tbody>{rows}</tbody>
                </Table>
              </div>
            </div>
            <div className="w-[30%] h-2/5	bg-white rounded-lg px-10 py-8">
              <div className="flex flex-col gap-5">
                <span className="flex justify-between">
                  Нийт үнэ <span>Sup total 123'222₮</span>
                </span>
                <span className="flex justify-between">
                  Хөнглөлт <span>0₮</span>
                </span>
                <hr className="h-px my-3 border-0 border-t-dashed bg-gray-300" />
                <span className="flex justify-between">
                  Нийлбэр үнэ <span>Grand total 123'222₮</span>
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
                  үргэлжлүүлэх
                </Button>
              </div>
            </div>
          </div>
        </div>
      </GlobalLayout>
    </>
  );
};

export default CartItems;
