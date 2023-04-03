import { Button, Checkbox, Table, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect, useContext, Suspense } from "react";
import Magnifier from "../../components/Magnifier/Magnifier";
import Address from "./shippingAddress";
import { useRouter } from "next/router";
import { Store } from "@/utils/Store";
import $ from "jquery";
import Loading from "../home/loading";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import { SuccessNotification } from "../../utils/SuccessNotification";
import { getCookie, setCookie } from "cookies-next";
const CartItems = (props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [cartItem, setCartItem] = useState();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addressVisible, setAddressVisible] = useState(false);
  const [isChangeQuantity, setIsChangeQuantity] = useState(false);
  const [total, setTotal] = useState();
  const [stock, setStock] = useState();
  const [purchaseQuantity, setPurchaseQuantity] = useState();
  const [isChangeAdd, setIsChangeAdd] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [selectedShippingData, setSelectedShippingData] = useState({});
  const [select, setSelect] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

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
    if (cartItem !== undefined) {
      cartItem.map((item) => {
        if (item.totalPrice) sum = sum + parseInt(item.totalPrice);
        else {
          sum = sum + parseInt(item.total);
        }
      });
    }
    return <span>{sum}₮</span>;
  };

  const getUserCartItem = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    const temp = [];
    const requestOption = {
      method: "GET",
      headers: myHeaders,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart`,
      requestOption
    );
    if (res.status === 200) {
      const data = await res.json();
      if (data.success === true) {
        if (data.result.length > 0) setCartItem(data.result[0].cart_items);
      }
    }
  };
  const addToCartMultiple = async (arr, token) => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    const temp = [];
    arr.forEach((e) => {
      temp.push({ id: e.id, qty: e["purchaseCount"] });
    });
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        items_to_cart: temp,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/add/multi`,
      requestOption
    );
    if (res.status === 200) {
      const data = await res.json();
      console.log(data, "data multople add to cart");
      setCookie("addCart", false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side operation such as local storage.
      let localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
      window.dispatchEvent(new Event("storage"));
      let data = localStorageCart?.cart?.cartItems;
      let arr = [];
      if (
        localStorageCart !== null &&
        localStorageCart.cart.cartItems.length > 0
      ) {
        data.forEach((e) => {
          if (e !== null) {
            let clone = { ...e };
            clone["isChecked"] = false;
            clone["remainStock"] = clone["instock"] - clone["purchaseCount"];
            clone["totalPrice"] = clone["price"] * clone["purchaseCount"];
            // clone['total'] = clone['purchaseCount'] * clone['price']
            arr.push(clone);
          }
        });
        setCartItem(arr);
      }
      const token = getCookie("token");
      const addToCart = getCookie("addCart");
      setUserToken(token);
      if (token !== undefined && token !== null && token !== "") {
        setAddressVisible(true);
        if (addToCart === true) {
          addToCartMultiple(arr, token);
          getUserCartItem(token);
        } else {
          getUserCartItem(token);
        }
      } else {
        setAddressVisible(false);
      }
    }
  }, []);

  const deleteFromCart = async () => {
    let newArr = [...cartItem];
    let removedArr = [];
    let cartId;
    newArr.forEach((e) => {
      if (e.isChecked === true) {
        const index = newArr.indexOf(e);
        delete newArr[index];
        cartId = e.cartid;
        removedArr.push({ productid: e.productid });
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
    if (userToken !== null && (userToken !== undefined) !== "") {
      if (temp.length === 0) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        myHeaders.append("Content-Type", "application/json");
        const requestOption = {
          method: "GET",
          headers: myHeaders,
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/empty`,
          requestOption
        );
        if (res.status === 200) {
          const data = await res.json();
          if (data.success === true) {
            console.log("delete all success");
            SuccessNotification({
              message: "Сагсанд дахь бүх бараа амжилттай устлаа!",
              title: "Сагсны бараа",
            });
          }
        }
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        myHeaders.append("Content-Type", "application/json");
        let data = { cartid: cartId, data: removedArr };
        const requestOption = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(data),
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/item/remove`,
          requestOption
        );
        if (res.status === 200) {
          const data = await res.json();
          console.log(data, "dasdasdasd");
          if (data.success === true) {
            console.log(data.message, "message");
            SuccessNotification({
              message: "Сагсанд дахь бараа амжилттай устлаа!",
              title: "Сагсны бараа устгах",
            });
          }
        }
      }
    }
    removedArr = [];
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

  const makeOrder = async () => {
    if (userToken !== null && userToken !== undefined && userToken !== "") {
      if (select) {
        const data = `Хот: ${selectedShippingData.city}, Дүүрэг: ${selectedShippingData.district}, Хороо: ${selectedShippingData.committee}, Гудамж: ${selectedShippingData.street}, Байр: ${selectedShippingData.apartment}, Тоот: ${selectedShippingData.number}, Утас: ${selectedShippingData.phone}`;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);
        myHeaders.append("Content-Type", "application/json");
        const requestOption = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            address: data,
          }),
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order`,
          requestOption
        );
        if (res.status === 200) {
          const data = await res.json();
          if (data.success === true) {
            let temp = [];
            setCartItem(temp);
            dispatch({ type: "CART_REMOVED_ITEM", payload: temp });
            SuccessNotification({ message: data.message, title: "Захиалга" });
            router.push("/home");
          }
        } else if (res.status === 500) {
          showNotification({
            message: "Сагсанд бараа байхгүй байна!",
            color: "red",
          });
        }
      } else {
        showNotification({
          message: "Хаяг сонгоно уу!",
          color: "red",
        });
      }
    } else {
      router.push("/login");
    }
  };

  const minusQuantity = async (count, product) => {
    const initialStock = product.instock;
    count--;
    if (initialStock >= count && count >= 0) {
      let clone = { ...product };
      clone["remainStock"] = initialStock - count;
      clone["purchaseCount"] = count;
      clone["totalPrice"] = count * clone["price"];
      let temp = [...cartItem];
      temp.forEach((e, index) => {
        if (e.id === product.id) {
          temp[index] = clone;
        }
      });
      setCartItem(temp);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + userToken);
      myHeaders.append("Content-Type", "application/json");
      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          productid: product.productid,
          quantity: count,
          cartid: product.cartid,
        }),
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/item/quantity`,
        requestOption
      );

      if (res.status === 200) {
        const data = await res.json();
        if (data.success === true) {
          console.log(data.message, "message");
        }
      }
    }
  };

  const addQuantity = async (count, product) => {
    const initialStock = product.instock;
    count++;
    if (initialStock >= count) {
      let clone = { ...product };
      clone["remainStock"] = initialStock - count;
      clone["purchaseCount"] = count;
      clone["totalPrice"] = count * clone["price"];
      let temp = [...cartItem];
      temp.forEach((e, index) => {
        if (e.id === product.id) {
          temp[index] = clone;
        }
      });
      setCartItem(temp);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + userToken);
      myHeaders.append("Content-Type", "application/json");
      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          productid: product.productid,
          quantity: count,
          cartid: product.cartid,
        }),
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/item/quantity`,
        requestOption
      );
      if (res.status === 200) {
        const data = await res.json();
        console.log(data, "dasdasdasd");
        if (data.success === true) {
          console.log(data.message, "message");
          setButtonPressed(false);
        }
      }
    }
  };

  const ths = (
    <tr className="table-row">
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
      <th width={"100px"}>Нийт дүн</th>
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
                    Үлдэгдэл:{" "}
                    <span className="text-[#212529]">
                      {item.remainStock
                        ? item.remainStock
                        : item.instock - item.quantity}
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
                    onClick={() =>
                      item.purchaseCount
                        ? minusQuantity(item.purchaseCount, item)
                        : minusQuantity(item.quantity, item)
                    }
                  >
                    <IconMinus size="1.2rem" color="#212529" />
                  </ActionIcon>
                  <span className="font-[500] text-[1rem] text-[#212529]">
                    {item.purchaseCount !== undefined &&
                      item.purchaseCount !== null
                      ? item.purchaseCount
                      : item.quantity}
                  </span>
                  <ActionIcon
                    sx={{
                      ":hover": { backgroundColor: "#ebfbee" },
                    }}
                    className="ml-3"
                    onClick={() =>
                      item.purchaseCount
                        ? addQuantity(item.purchaseCount, item)
                        : addQuantity(item.quantity, item)
                    }
                  >
                    <IconPlus size="1.2rem" color="#212529" />
                  </ActionIcon>
                </div>
              </div>
            </td>
            <td width={"100px"} style={{ textAlign: "center" }}>
              <span className="font-[600] text-[1rem] text-[#212529]">
                {item.price ? item.price : item.price_mnt} ₮
              </span>
            </td>
            <td width={"100px"} style={{ textAlign: "center" }}>
              <span className="font-[600] text-[1rem] text-[#212529]">
                {item.totalPrice ? item.totalPrice : item.total} ₮
              </span>
            </td>
          </tr>
        );
      }
    });

  return (
    <>
      <GlobalLayout>
        <div className="bg-grey-back w-full px-8 py-4">
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
              {addressVisible === true && (
                <Address
                  setSelectedShippingData={setSelectedShippingData}
                  setSelect={setSelect}
                />
              )}
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
                  Хөнгөлөлт
                  <span className="font-[500] text-[1.05rem] text-[#212529]">
                    0 ₮
                  </span>
                </span>
                <span className="flex justify-between font-[400] text-[1.05rem] text-[#2125297a]">
                  Хүргэлт
                  <span className="font-[500] text-[1.05rem] text-[#212529]">
                    0 ₮
                  </span>
                </span>
                <hr className="h-px my-1 border-0 border-t-dashed bg-gray-300" />
                <span className="flex justify-between mb-1 font-[400] text-[1.1rem] text-[#212529af]">
                  Нийлбэр үнэ{" "}
                  <span className="font-[500] text-[1.1rem] text-[#212529]">
                    {totalPrice()}
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
                  onClick={() => makeOrder()}
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
