import Image from "next/image";
import NavBarLinks from "../components/nav-bar-links";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Autocomplete,
  Avatar,
  Button,
  Group,
  Loader,
  Select,
  Text,
  Tooltip,
} from "@mantine/core";
import { forwardRef, useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { getCookie, setCookie } from "cookies-next";
import { ErrorNotificatipon } from "../utils/SuccessNotification";
import { openContextModal } from "@mantine/modals";
import {
  IconArrowsExchange,
  IconArrowsExchange2,
  IconHomeEco,
  IconPackage,
  IconReportSearch,
  IconSearch,
  IconStatusChange,
} from "@tabler/icons-react";

import axios from "axios";
import useSWR from "swr";
import { useDebouncedValue } from "@mantine/hooks";
import { CategoryContext } from "@/utils/categoryContext";
import { UserConfigContext } from "@/utils/userConfigContext";
import { isMobile } from "react-device-detect";

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => res.data.data)
    .catch(() => { });
const cookie = getCookie("token");
const Navbar = (props) => {
  const { address } = props;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced] = useDebouncedValue(searchQuery, 250);
  const userContext = useContext(UserConfigContext);
  // const [data, setData] = useState()
  const {
    data: categories,
    error: catsError,
    isLoading: catsLoading,
    catsIsValidating,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/category/all?type=nest`,
    fetcher,
    {
      refreshInterval: 0,
    }
  );
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL
    }/product/local?limit=${10}&query=${debounced}`,
    fetcher
  );

  const suggestions = data
    ? data.map((e) => {
      return {
        value: e.name,
        id: e.id,
        image: e.product_image?.images?.[0],
        description: e.description,
      };
    })
    : [];

  useEffect(() => {
    mutate();
  }, [debounced]);

  useEffect(() => {
    if (isMobile === true && catsLoading === false) {
      props.getValue(categories);
    }
  }, [categories]);
  const AutocompleteItem = forwardRef(({ image, value, ...others }, ref) => {
    return (
      <div
        ref={ref}
        style={{ padding: "10px", marginTop: "5px" }}
        className=" hover:cursor-pointer hover:bg-gray-100 hover:rounded-md"
        {...others}
      >
        <Group noWrap>
          <Avatar src={image} alt="Зураг">
            {" "}
            <IconPackage stroke={1.5} />
          </Avatar>
          <div>
            <Text>{value}</Text>
            {/* <Text size="xs" color="dimmed">
              {props?.description}
            </Text> */}
          </div>
        </Group>
      </div>
    );
  });
  const [cartItem, setCartItem] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
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
            total = total + parseInt(e.totalPrice);
          } else {
            total = total + parseInt(e.total);
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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, requestOptions)
      .then((req) => req.json())
      .then((res) => {
        if (res.success === true) {
          setCartData(res.result);
        }
      });
  };
  const [userConfigValue, setUserConfigValue] = useState(
    userContext.preferenceConfig
  );

  useEffect(() => {
    setUserConfigValue(userContext.configId);
  }, [userContext.preferenceConfig, userContext.configId]);

  const handleConfigSelection = (value) => {
    if (userConfigValue !== value) {
      setCookie("preference_config", value, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      route.reload();
    }
  };

  return (
    <div
      className="bg-white py-2 px-12 max-sm:px-2 sticky top-0 z-30 "
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)", backgroundColor: address?.header_color ? address?.header_color : null }}
    >
      <div className="flex justify-between items-center">
        <Link href={"/home"}>
          <div className="flex justify-center items-center ">
            <Image src={userContext?.address?.logo} width={36} height={36} className="w-7 h-7" />
          </div>
        </Link>
        <div className="flex justify-end md:justify-center items-center gap-8 md:gap-3 flex-grow ml-6 md:mx-11 ">
          {catsError && <div>error</div>}
          {catsLoading && (
            <div>
              <Loader variant="dots" color="yellow" />
            </div>
          )}
          {categories && (
            <Tooltip
              withArrow
              label="Танд зөвхөн уг төрлийн бараа, ангиллууд харагдана"
              className=" md:block"
            >
              <Select
                // variant="filled"
                size="md"
                radius="xl"
                value={userConfigValue}
                onChange={(value) => handleConfigSelection(value)}
                // rightSection={<IconArrowsExchange2 size="1rem" />}
                // rightSectionWidth={30}
                // styles={{ rightSection: { pointerEvents: "none" } }}
                styles={(theme) => ({
                  item: {
                    "&[data-selected]": {
                      "&, &:hover": {
                        backgroundColor: "#f9bc60",
                      },
                    },

                    // applies styles to hovered item (with mouse or keyboard)
                    "&[data-hovered]": {},
                  },
                })}
                data={
                  catsError
                    ? []
                    : categories?.map((e) => {
                      return {
                        value: e.id?.toString(),
                        label: e.name,
                      };
                    })
                }
                icon={
                  userConfigValue === "1" ? (
                    <IconHomeEco stroke={1.5} color="#204900" />
                  ) : (
                    <IconReportSearch stroke={1.5} color="#5E4333" />
                  )
                }
              />
            </Tooltip>
          )}

          <div className="hidden md:block max-w-lg flex-grow ">
            <Autocomplete
              className="w-full"
              size={"md"}
              placeholder="Бараа хайх..."
              itemComponent={AutocompleteItem}
              data={suggestions ? suggestions : []}
              limit={10}
              styles={{
                root: {
                  paddingLeft: isMobile ? "0px" : "5px",
                  paddingRight: 0,
                  borderRadius: 25,
                  flexGrow: 4,
                },
                input: {
                  borderRadius: 25,
                  "::placeholder": {
                    fontSize: ".95rem",
                  },
                },
                rightSection: {
                  margin: 0,
                  padding: 0,
                },
              }}
              value={searchQuery}
              onChange={setSearchQuery}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  router.push({
                    pathname: "/products",
                    query: { q: searchQuery },
                  });
                }
              }}
              onItemSubmit={({ id }) =>
                router.push({
                  pathname: "/product/[id]",
                  query: { id },
                })
              }
              rightSection={
                <button
                  className="m-auto h-full  bg-background-sort p-2 px-6 rounded-full max-xs:w-11 max-xs:flex max-xs:items-center max-xs:justify-center max-xs:p-0 max-xs:px-0 "
                  onClick={() => {
                    router.push({
                      pathname: "/products",
                      query: { q: searchQuery },
                    });
                  }}
                >
                  <IconSearch
                    color="white"
                    size="1.2rem"
                    stroke={2.5}
                    className="max-xs:w-4 max-xs:h-4"
                  />
                </button>
              }
            />
          </div>
          <div className="block md:hidden ">
            <button
              className="w-full m-auto h-full bg-background-sort p-3 rounded-full max-xs:w-11 max-xs:h-11 max-xs:flex max-xs:items-center max-xs:justify-center max-xs:p-0 max-xs:px-0 "
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <IconSearch
                color="white"
                size="1.2rem"
                stroke={2.5}
                className="max-xs:w-4 max-xs:h-4"
              />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 max-xs:gap-2">
          <div className="hidden md:block">
            <Button compact variant={"white"} onClick={() => linkToCart()}>
              <Image
                src="/icons/trolley.svg"
                width={23}
                height={23}
                className="max-xs:w-6 h-6"
              />
              <div className="absolute">
                <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-5 rounded-full text-xs ml-5">
                  <p className="text-sm-5">{quantity}</p>
                </div>
              </div>
            </Button>
          </div>
          <div className="hidden md:block">
            <Avatar
              src={null}
              size={40}
              alt="user"
              radius="xl"
              component="button"
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
                  route.push("/profile");
                }
              }}
            >
              <Image
                src="/user.png"
                width={40}
                height={40}
                className="w-8 h-8"
              />
            </Avatar>
          </div>
        </div>
      </div>
      <div>
        {showSearch && (
          <div className="mt-4">
            <Autocomplete
              className="w-full"
              size={"md"}
              placeholder="Бараа хайх..."
              itemComponent={AutocompleteItem}
              data={suggestions ? suggestions : []}
              limit={10}
              styles={{
                root: {
                  paddingLeft: isMobile ? "0px" : "5px",
                  paddingRight: 0,
                  borderRadius: 25,
                  flexGrow: 4,
                },
                input: {
                  borderRadius: 25,
                  "::placeholder": {
                    fontSize: ".95rem",
                  },
                },
                rightSection: {
                  margin: 0,
                  padding: 0,
                },
              }}
              value={searchQuery}
              onChange={setSearchQuery}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  router.push({
                    pathname: "/products",
                    query: { q: searchQuery },
                  });
                }
              }}
              onItemSubmit={({ id }) =>
                router.push({
                  pathname: "/product/[id]",
                  query: { id },
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
