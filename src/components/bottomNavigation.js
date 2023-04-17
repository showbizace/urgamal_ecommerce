import Image from "next/image";
import NavBarLinks from "./nav-bar-links";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Store } from "@/utils/Store";
import { getCookie, setCookie } from "cookies-next";
import { ErrorNotificatipon } from "../utils/SuccessNotification";
import { UserConfigContext } from "@/utils/userConfigContext";
import { openContextModal } from "@mantine/modals";
import {
  IconShoppingCart,
  IconHomeEco,
  IconCategory2,
  IconUserCircle,
  IconReportSearch,
} from "@tabler/icons-react";

const BottomNavBar = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const userContext = useContext(UserConfigContext);

  const linkToCart = () => {
    router.push({
      pathname: "/cart/cartItem",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side operation such as local storage.
      window.addEventListener("storage", handleChangeStorage);
    }
  }, []);

  const handleChangeStorage = () => {
    let localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
    if (localStorageCart !== null) {
      let sum = 0;
      let total = 0;
      localStorageCart.cart.cartItems.forEach((e) => {
        if (e !== null) {
          sum = sum + e.quantity;
          if (e.totalPrice !== undefined && e.totalPrice !== null) {
            total = total + parseInt(e.totalPrice);
          } else {
            total = total + parseInt(e.total);
          }
        }
      });
      setQuantity(sum);
    }
  };

  return (
    <div className="block md:hidden  sticky bottom-0 z-50">
      <div className="relative">
        <div className="w-full bg-white p-4 h-full bg-white border-t border-gray-200 ">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
            <button
              type="button"
              className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
            >
              <IconCategory2 className="group-hover:text-blue-600 " />
              <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
                Ангилал
              </span>
            </button>
            <button
              type="button"
              className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
            >
              <IconHomeEco className="group-hover:text-blue-600 " />
              <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
                Нүүр
              </span>
            </button>
            <button
              onClick={() => linkToCart()}
              type="button"
              className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
            >
              <div className="absolute">
                <div className="w-5 h-5 bg-number flex justify-center items-center text-white -mt-9 rounded-full text-sm ml-8">
                  <p className="text-md">{quantity}</p>
                </div>
              </div>
              <IconShoppingCart className="group-hover:text-blue-600 " />
              <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
                Сагс
              </span>
            </button>
            <button
              type="button"
              className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
              onClick={() => {
                if (!userContext.auth) {
                  openContextModal({
                    modal: "login",
                    title: (
                      <Text size="sm" weight={400}>
                        Хэрэглэгч та өөрийн утасны дугаараар нэвтрэнэ үү
                      </Text>
                    ),
                    centered: true,
                  });
                } else {
                  router.push("/profile");
                }
              }}
            >
              <IconUserCircle className="group-hover:text-blue-600 " />
              <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
                Профайл
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
