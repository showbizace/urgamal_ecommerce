import Image from "next/image";
import NavBarLinks from "../components/nav-bar-links";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { getCookie } from "cookies-next";
import { ErrorNotificatipon } from "../utils/SuccessNotification";
import { openContextModal } from "@mantine/modals";
const cookie = getCookie("token");

const Navbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [cartItem, setCartItem] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [cartData, setCartData] = useState("");
  const route = useRouter();
  const [number, setNumber] = useState("");
  const [total, setTotal] = useState(0);
  const linkToCart = () => {
    router.push({
      pathname: "/cart/cartItem",
    });
  };

  const handleChangeStorage = () => {
    let localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
    if (localStorageCart !== null) {
      setCartItem(localStorageCart?.cart?.cartItems);
      let sum = 0;
      let total = 0;
      localStorageCart.cart.cartItems.forEach((e) => {
        if (e !== null) {
          sum = sum + e.quantity;
          if (e.totalPrice !== undefined && e.totalPrice !== null) {
            total = total + parseInt(e.totalPrice)
          } else {
            total = total + parseInt(e.total)
          }
        }
      });
      setQuantity(sum);
      setTotal(total);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side operation such as local storage.
      window.addEventListener("storage", handleChangeStorage);
    }
    const number = getCookie("number");
    if (number !== undefined && number !== null && number !== "") {
      setNumber(number);
    }
    getCartTotal();
  }, []);

  const getCartTotal = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, requestOptions)
      .then((req) => req.json())
      .then((res) => {
        if (res.success === true) {
          setCartData(res.result);
        }
      });
  };

  return (
    <div
      className="bg-white flex flex-row  justify-between  items-center py-2 px-10"
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
    >
      <Link href={"/home"}>
        <div className="flex flex-row justify-center items-center text-black">
          ТАРИMАЛ{" "}
          <Image src="/logo.png" width={30} height={30} className="mx-4" />{" "}
          УРГАMАЛ
        </div>
      </Link>

      <div className="flex flex-row">
        <NavBarLinks
          name={"Өрхийн тариаланч"}
          linkUrl={"/"}
          onClick={() => { }}
        />
        <NavBarLinks
          name={"Мэргэжлийхэнд"}
          linkUrl={"/"}
          onClick={() => { }}
          isLast
        />
      </div>
      <div className="flex flex-row items-center">
        {/* <Button
          compact
          variant={"white"}
          className="static flex flex-col items-center mr-4"
        >
          <Image src="/icons/hearth.svg" width={23} height={23} />
          <div className="absolute">
            <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-5 rounded-full text-xs ml-5">
              <p className="text-sm-5">1</p>
            </div>
          </div>
        </Button> */}

        <Button
          compact
          variant={"white"}
          className="static flex flex-col items-center mr-4"
          onClick={() => linkToCart()}
        >
          <Image src="/icons/trolley.svg" width={23} height={23} />
          <div className="absolute">
            <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-5 rounded-full text-xs ml-5">
              <p className="text-sm-5">{quantity}</p>
            </div>
          </div>
        </Button>

        <div>
          <p className="text-sm-1 self-end">Таны сагсанд</p>
          <p className="text-sm-1" style={{ fontSize: "16px" }}>
            {total}₮
          </p>
        </div>

        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => {
            if (cookie === undefined || null) {
              openContextModal({
                modal: "login",
                id: "login-modal",
                title: (
                  <Text size="sm" weight={400}>
                    Хэрэглэгч та өөрийн утасны дугаараар нэвтрэнэ үү
                  </Text>
                ),
                centered: true,
              });
            } else {
              route.push("/profile");
            }
          }}
        >
          <div className="flex justify-center items-center ml-8">
            <Image src="/user.png" width={40} height={40} />
          </div>
          {/* <div className=" flex flex-col items-end">
            {cookie === undefined || null ? (
              <p className="text-md ml-4">Нэвтрэх</p>
            ) : (
              <div>
                <p className="text-sm-1">Сайн байна уу?</p>
                <p className="text-sm">
                  {number !== "" ? number : "*********"}
                </p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
