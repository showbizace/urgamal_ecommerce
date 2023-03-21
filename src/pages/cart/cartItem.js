import GlobalLayout from "@/pages/components/GlobalLayout/GlobalLayout";
import { Button, Checkbox, Table, ActionIcon } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect, useContext, Suspense } from "react";
import useSWR from "swr";
import Magnifier from "../components/Magnifier/Magnifier";
import Address from "./#shippingAddress";
import { useRouter } from "next/router";
import { Store } from "@/utils/Store";
import $ from "jquery";
import Loading from "../home/loading";

const CartItems = (props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [total, setTotal] = useState(0);
  const [cartItem, setCartItem] = useState();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    let arr = [];
    if (isCheckAll === true) {
      cartItem.forEach((e) => {
        let clone = { ...e };
        clone["isChecked"] = false;
        arr.push(clone);
      });
      setCartItem(arr);
    } else {
      cartItem.forEach((e) => {
        let clone = { ...e };
        clone["isChecked"] = true;
        arr.push(clone);
      });
      setCartItem(arr);
    }
  };

  const totalPrice = () => {
    let sum = 0;
    // cartItem.map((item) => {
    //   sum = sum + parseInt(item.price)
    // })

    return <span>{sum}₮</span>;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side operation such as local storage.
      let localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
      let data = localStorageCart?.cart?.cartItems;
      if (
        localStorageCart !== null &&
        localStorageCart.cart.cartItems.length > 0
      ) {
        let arr = [];
        data.forEach((e) => {
          if (e !== null) {
            let clone = { ...e };
            clone["isChecked"] = false;
            arr.push(clone);
          }
        });
        setCartItem(arr);
      }
    }
  }, []);

  const deleteFromCart = () => {
    let newArr = [...cartItem];
    newArr.forEach((e) => {
      if (e.isChecked === true) {
        const index = newArr.indexOf(e);
        delete newArr[index];
      }
    });
    let temp = [];
    newArr.forEach((e) => {
      if (e !== null && e !== undefined && !e.length) {
        temp.push(e);
      }
    });

    setCartItem(temp);
    dispatch({ type: "CART_REMOVED_ITEM", payload: temp });
    let object = { cart: { cartItems: temp } };
    if (typeof window !== "undefined") {
      // client-side operation such as local storage.
      localStorage.setItem("cartItems", JSON.stringify(object));
    }
    // localStorage.setItem("")
  };
  const handleClick = (e) => {
    let newArr = [...cartItem];
    console.log(newArr, "newArr");
    newArr.forEach((item) => {
      if (item !== undefined) {
        if (item.id === e.id) {
          item.isChecked = !e.isChecked;
        }
      }
    });

    setCartItem(newArr);

    // setIsCheck([e]);
    // setIsCheck(isCheck.filter((item) => item !== e));
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

  const rows =
    cartItem !== null &&
    cartItem !== undefined &&
    cartItem.map((item, idx) => {
      if (item !== undefined) {
        return (
          <tr key={idx}>
            <td>
              <Checkbox
                className="checkbox-input"
                checked={item.isChecked}
                id={item.id}
                onClick={(e) => handleClick(item)}
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
                    {item.name}
                  </span>
                  <span className="font-[500] text-[0.87rem] text-[#2125297a]">
                    Хэмжээ:{" "}
                    <span className="text-[#212529]">{item.purchaseCount}</span>
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
        );
      }
    });

  return (
    <>
      <GlobalLayout>
        <div className="bg-grey-back w-full px-32 py-4">
          <div className="flex flex-row gap-10 mt-8 px-32">
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
                      compact
                      variant="subtle"
                      leftIcon={<IconTrash size="1rem" />}
                      color="red"
                      onClick={() => deleteFromCart()}
                    >
                      Устгах
                    </Button>
                  </div>
                  <Suspense fallback={<Loading />}>
                    <div className="mt-6">
                      <Table captionSide="bottom" striped>
                        {/* <caption>Some elements from periodic table</caption> */}
                        <thead>{ths}</thead>
                        <tbody>{rows}</tbody>
                      </Table>
                    </div>
                  </Suspense>
                </div>
              </div>
              <Address />
            </div>

            <div className="w-[30%] h-2/5	bg-white rounded-lg px-10 py-8">
              <div className="flex flex-col gap-5">
                <span className="flex justify-between font-[400] text-[1.05rem] text-[#2125297a]">
                  Нийт үнэ
                  <span className="font-[500] text-[1.05rem] text-[#212529]">
                    {totalPrice()}
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
