import {
  Button,
  Checkbox,
  Table,
  ActionIcon,
  Modal,
  Group,
  Text,
  Badge,
  Tabs,
  Loader,
  Center,
  Stack,
  Switch,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconArrowLeft,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect, useContext, Suspense } from "react";
import Magnifier from "../../components/Magnifier/Magnifier";
import Address from "./shippingAddress";
import { useRouter } from "next/router";
import { Store } from "@/utils/Store";
import $ from "jquery";
import Loading from "../home/loading";
import { IconAlertCircle } from "@tabler/icons-react";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import { SuccessNotification } from "../../utils/SuccessNotification";
import { getCookie, setCookie } from "cookies-next";
import debounce from "lodash.debounce";
import { openContextModal } from "@mantine/modals";
import BottomFooter from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import { UserConfigContext } from "@/utils/userConfigContext";

const CartItems = (props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { auth } = useContext(UserConfigContext);
  const [cartItem, setCartItem] = useState();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invoiceId, setInvoiceId] = useState(null);
  const [addressVisible, setAddressVisible] = useState(false);
  const [isChangeQuantity, setIsChangeQuantity] = useState(false);
  const [total, setTotal] = useState();
  const [stock, setStock] = useState();
  const [isAvRemove, setIsAvRemove] = useState(false);
  const [orderId, setOrderId] = useState();
  const [purchaseQuantity, setPurchaseQuantity] = useState();
  const [isChangeAdd, setIsChangeAdd] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [selectedShippingData, setSelectedShippingData] = useState({});
  const [select, setSelect] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [loaderOpened, { open: openLoader, close: closeLoader }] =
    useDisclosure(false);

  const handleBack = () => {
    router.push("/");
  };

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
    )
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setCookie("addCart", false);
        }
      })
      .catch((err) => console.log(err, "err"));
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

  useEffect(() => {
    const token = getCookie("token");
    setUserToken(token);
    if (auth) {
      setAddressVisible(true);
    } else {
      setAddressVisible(false);
    }
  }, [auth]);

  const deleteFromCart = async () => {
    let check = true;
    let newArr = [...cartItem];
    let removedArr = [];
    let cartId;
    newArr.forEach((e) => {
      if (e.isChecked === true) {
        const index = newArr.indexOf(e);
        delete newArr[index];
        cartId = e.cartid;
        removedArr.push({ productid: e.productid });
        check = false;
      }
    });
    let temp = [];

    if (check === true) {
      showNotification({
        message: "Устгах бараа сонгоно уу",
        color: "red",
      });
    } else {
      newArr.forEach((e) => {
        if (e !== null && e !== undefined && !e.length) {
          temp.push(e);
        }
      });

      setCartItem(temp);
      dispatch({ type: "CART_REMOVED_ITEM", payload: temp });

      if (userToken) {
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
            if (data.success === true) {
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
    }
  };
  const handleClick = (e) => {
    let newArr = [...cartItem];
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
    if (auth) {
      if (select) {
        openLoader();
        const data = `Хот: ${selectedShippingData.city}, Дүүрэг: ${selectedShippingData.district}, Хороо: ${selectedShippingData.committee}, Гудамж: ${selectedShippingData.street}, Байр: ${selectedShippingData.apartment}, Тоот: ${selectedShippingData.number}, Утас: ${selectedShippingData.phone}`;
        const axiosReqOption = {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        };
        const requestOption = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: data,
          }),
        };
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/order`,
            requestOption
          );
          if (res.status === 200) {
            const data = await res.json();
            if (data.success === true) {
              // open();
              setOrderId(data.orderid);
              let temp = [];
              const cartItems = cartItem;
              setCartItem(temp);
              dispatch({ type: "CART_REMOVED_ITEM", payload: temp });
              // SuccessNotification({ message: data.message, title: "Захиалга" });
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_API_URL}/payment`,
                  { orderid: data.orderid },
                  axiosReqOption
                )
                .then((res) => {
                  openContextModal({
                    modal: "payment",
                    title: "Төлбөр төлөлт",
                    innerProps: {
                      paymentData: res.data.data,
                      shouldRedirect: true,
                    },
                    centered: true,
                    size: "lg",
                  });
                })
                .catch((err) => {
                  if (err.response) {
                    showNotification({
                      message: err.response.data,
                      color: "red",
                    });
                  } else {
                    showNotification({
                      message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
                      color: "red",
                    });
                  }
                });
            }
          } else if (res.status === 500) {
            showNotification({
              message: "Сагсанд бараа байхгүй байна!",
              color: "red",
            });
          }
        } catch (error) {
          showNotification({
            message: "Захиалга үүсгэхэд алдаа гарлаа!",
            color: "red",
          });
        }
        closeLoader();
      } else {
        if (checked === false) {
          showNotification({
            message: "Хаяг сонгоно уу эсвэл очиж авахыг идэвхжүүлнэ үү",
            color: "red",
          });
        } else {
          openLoader();
          const axiosReqOption = {
            headers: {
              Authorization: "Bearer " + userToken,
              "Content-Type": "application/json",
            },
          };
          const requestOption = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + userToken,
              "Content-Type": "application/json",
            },
          };
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/order`,
              requestOption
            );
            if (res.status === 200) {
              const data = await res.json();
              if (data.success === true) {
                // open();
                setOrderId(data.orderid);
                let temp = [];
                const cartItems = cartItem;
                setCartItem(temp);
                dispatch({ type: "CART_REMOVED_ITEM", payload: temp });
                // SuccessNotification({ message: data.message, title: "Захиалга" });
                axios
                  .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/payment`,
                    { orderid: data.orderid },
                    axiosReqOption
                  )
                  .then((res) => {
                    openContextModal({
                      modal: "payment",
                      title: "Төлбөр төлөлт",
                      innerProps: {
                        paymentData: res.data.data,
                        shouldRedirect: true,
                      },
                      centered: true,
                      size: "lg",
                    });
                  })
                  .catch((err) => {
                    if (err.response) {
                      showNotification({
                        message: err.response.data,
                        color: "red",
                      });
                    } else {
                      showNotification({
                        message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
                        color: "red",
                      });
                    }
                  });
              }
            } else if (res.status === 500) {
              showNotification({
                message: "Сагсанд бараа байхгүй байна!",
                color: "red",
              });
            }
          } catch (error) {
            showNotification({
              message: "Захиалга үүсгэхэд алдаа гарлаа!",
              color: "red",
            });
          }
          closeLoader();
        }
      }
    } else {
      openContextModal({
        modal: "login",
        title: (
          <Text size="sm" weight={400}>
            Хэрэглэгч та өөрийн утасны дугаараар нэвтрэнэ үү
          </Text>
        ),
        centered: true,
      });
    }
  };

  const minusQuantity = async (count, product) => {
    if (product?.instock) {
      const initialStock = product.instock;
      count--;
      if (initialStock >= count && count > 0) {
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
        dispatch({
          type: "CART_REMOVE_QUANTITY",
          payload: temp,
        });
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
        if (userToken) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/item/quantity`,
            requestOption
          );

          if (res.status === 200) {
            const data = await res.json();
            if (data.success === true) {
            }
          }
        }
      }
    } else {
      showNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна",
        color: "red",
      });
    }
  };

  const addQuantity = async (count, product) => {
    if (product?.instock) {
      const initialStock = product.instock;
      count++;
      if (initialStock >= count) {
        let clone = { ...product };
        clone["remainStock"] = initialStock - count;
        console.log(clone["remainStock"], "remain");
        clone["purchaseCount"] = count;
        clone["totalPrice"] = count * clone["price"];
        let temp = [...cartItem];
        temp.forEach((e, index) => {
          if (e.id === product.id) {
            temp[index] = clone;
          }
        });
        setCartItem(temp);
        dispatch({
          type: "CART_ADD_QUANTITY",
          payload: temp,
        });
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
        if (userToken) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/item/quantity`,
            requestOption
          );
          if (res.status === 200) {
            const data = await res.json();
            if (data.success === true) {
              setButtonPressed(false);
            }
          }
        }
      } else {
        showNotification({
          message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
          color: "red",
        });
      }
    } else {
      showNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
        color: "red",
      });
    }
  };

  const ths = (
    <tr className="table-row">
      <th className="lg:py-10 w-[5%]">
        <Checkbox
          value="selectAll"
          onClick={handleSelectAll}
          checked={isCheckAll}
          size="sm"
        />
      </th>
      <th className="w-[40%] text-center">Бараа</th>
      <th className="w-[15%] text-center">Ширхэг</th>
      <th className="w-[20%] text-center">Үнэ</th>
      <th className="w-[20%] text-center">Дүн</th>
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
                size="sm"
              />
            </td>
            <td>
              <div className="flex flex-row lg:gap-8">
                {/* <Magnifier
                  imgSrc={"/bundle-1.svg"}
                  imgWidth={80}
                  imgHeight={80}
                  magnifierRadius={50}
                /> */}
                <Image
                  loader={() => item?.picture_url}
                  src={item?.picture_url}
                  width={80}
                  height={80}
                  alt={item.name}
                />
                <div className="flex flex-col justify-around ml-2 lg:ml-0">
                  <span className="font-[500] lg:text-[1.002rem] text-[0.55rem] text-[#212529]">
                    {item.name}
                  </span>
                  <span className="font-[500] lg:text-[0.87rem] text-[0.6rem] text-[#2125297a]">
                    Үлдэгдэл:{" "}
                    <span className="text-[#212529]">
                      {/* {item.remainStock !== undefined || item.remainStock !== null
                        ? item.remainStock
                        : item.instock - item.quantity} */}
                      {item.instock > 10 ? (
                        <Badge color="teal" size={"xs"}>
                          Хангалттай
                        </Badge>
                      ) : item.instock == 0 ? (
                        <Badge color="yellow" size={"xs"}>
                          Үлдэгдэлгүй
                        </Badge>
                      ) : (
                        <span className="text-greenish-grey text-xs  ">
                          {item.instock} {item.unit}
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div className="inherit">
                <div className="flex items-center border border-[#21252923] rounded lg:p-1">
                  <ActionIcon
                    sx={{
                      ":hover": { backgroundColor: "#fff5f5" },
                    }}
                    className="lg:mr-3 w-4 h-4 p-0 m-0"
                    onClick={() =>
                      item.purchaseCount
                        ? minusQuantity(item.purchaseCount, item)
                        : minusQuantity(item.quantity, item)
                    }
                  >
                    <IconMinus
                      size="1.2rem"
                      color="#212529"
                      className="w-2 h-2 lg:w-4 lg:h-4"
                    />
                  </ActionIcon>
                  <span className="font-[500] lg:text-[1rem] text-[0.6rem] text-[#212529]">
                    {item.purchaseCount !== undefined &&
                    item.purchaseCount !== null
                      ? item.purchaseCount
                      : item.quantity}
                  </span>
                  <ActionIcon
                    sx={{
                      ":hover": { backgroundColor: "#ebfbee" },
                    }}
                    className="lg:ml-3"
                    onClick={() => {
                      item.purchaseCount
                        ? addQuantity(item.purchaseCount, item)
                        : addQuantity(item.quantity, item);
                    }}
                  >
                    <IconPlus
                      size="1.2rem"
                      color="#212529"
                      className="w-2 h-2 lg:w-4 lg:h-4"
                    />
                  </ActionIcon>
                </div>
              </div>
            </td>
            <td width={"100px"} style={{ textAlign: "center" }}>
              <span className="font-[600] lg:text-[1rem] text-[0.6rem] text-[#212529]">
                {item.price ? item.price : item.price_mnt} ₮
              </span>
            </td>
            <td width={"100px"} style={{ textAlign: "center" }}>
              <span className="font-[600] lg:text-[1rem] text-[0.6rem] text-[#212529]">
                {item.totalPrice ? item.totalPrice : item.total} ₮
              </span>
            </td>
          </tr>
        );
      }
    });

  return (
    <GlobalLayout>
      <Modal
        centered
        opened={loaderOpened}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        size="xs"
      >
        <Stack align="center" my="lg" spacing="lg">
          <Text align="center">Уншиж байна...</Text>
          <Loader size="lg" color="yellow" />
        </Stack>
      </Modal>

      <div className="bg-grey-back w-full lg:px-8 lg:py-4 px-4 py-4  h-screen relative">
        <div className="absolute top-9">
          <Button
            variant="subtle"
            color=""
            leftIcon={<IconArrowLeft />}
            px={0}
            size="lg"
            styles={(theme) => ({
              root: {
                color: theme.fn.darken("#F9BC60", 0.04),
                "&:hover": theme.fn.hover({
                  color: theme.fn.darken("#F9BC60", 0.06),
                  background: "none",
                  textDecoration: "underline",
                }),
              },
            })}
            onClick={handleBack}
          >
            Буцах
          </Button>
        </div>
        <div className="flex md:flex-row flex-col lg:gap-10 lg:mt-8 gap-4 lg:px-32">
          <div className="flex relative flex-col lg:w-[70%] w-[100%] lg:gap-8">
            <div>
              <div className=" bg-white rounded-lg lg:px-10 lg:py-6 px-3 py-3">
                <div className="flex flex-row justify-between">
                  <span className="font-[500] lg:text-[1.3rem] text-[#212529]">
                    Сагс
                  </span>
                  <div className="font-[400] text-[1rem] text-[#ff6868]"></div>
                  <Button
                    component="a"
                    href="#"
                    compact
                    variant="subtle"
                    leftIcon={<IconTrash size="1rem" />}
                    sx={(theme) => ({
                      "@media (max-width: 40em)": {
                        fontSize: theme.fontSizes.xs,
                      },
                    })}
                    color="red"
                    onClick={() => deleteFromCart()}
                  >
                    Устгах
                  </Button>
                </div>
                {/* <Suspense fallback={<Loading />}> */}
                <div className="mt-6 overflow-auto max-h-80">
                  <Table captionSide="bottom" striped>
                    {/* <caption>Some elements from periodic table</caption> */}
                    <thead>{ths}</thead>
                    <tbody>{rows}</tbody>
                  </Table>
                </div>
                {/* </Suspense> */}
              </div>
            </div>
            {addressVisible === true && (
              <Address
                setSelectedShippingData={setSelectedShippingData}
                setSelect={setSelect}
              />
            )}
          </div>

          <div className="lg:w-[30%] h-2/5	bg-white rounded-lg lg:px-10 lg:py-8 px-4 py-4">
            <div className="flex flex-col lg:gap-5 gap-3">
              <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                Нийт үнэ
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  {totalPrice()}
                </span>
              </span>
              <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                Хөнгөлөлт
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  0 ₮
                </span>
              </span>
              <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                Хүргэлт
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  0 ₮
                </span>
              </span>
              <div className="flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                    Очиж авах
                    <Tooltip label="Очиж авах бол заавал баруун гар талд байгаа товчийг идэвхжүүлнэ үү">
                      <IconAlertCircle
                        className="h-5 w-5 self-center ml-2 "
                        color="black"
                      />
                    </Tooltip>
                  </span>
                </div>
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  <Switch
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                  />
                </span>
              </div>
              <hr className="h-px my-1 border-0 border-t-dashed bg-gray-300" />
              <span className="flex justify-between mb-1 font-[400] lg:text-[1.1rem] text-sm text-[#212529af]">
                Нийлбэр үнэ{" "}
                <span className="font-[500] lg:text-[1.1rem] text-sm text-[#212529]">
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
                sx={(theme) => ({
                  "@media (max-width: 40em)": {
                    fontSize: theme.fontSizes.xs,
                  },
                })}
                color="yellow"
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
        {/* <div className="mt-20">
            <div>
              <span>Санал Болгох Бүтээгдэхүүн</span>
            </div>
          </div> */}
      </div>
    </GlobalLayout>
  );
};

export default CartItems;
