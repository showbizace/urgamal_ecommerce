import Image from "next/image";
import {
  Text,
  Button,
  LoadingOverlay,
  Badge,
  ThemeIcon,
  ActionIcon,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { addCart } from "../utils/Store";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconCircleXFilled,
  IconHeart,
  IconHeartFilled,
  IconPhotoOff,
} from "@tabler/icons-react";
import {
  SuccessNotification,
  ErrorNotification,
} from "../utils/SuccessNotification";
import { useRouter } from "next/router";
import { fetchMethod } from "@/utils/fetch";
import useWishlist from "@/hooks/useWishlist";

const ProductCard = ({ key, src, data, shouldScale = true }) => {
  const [productCount, setProductCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = getCookie("token");
  const [toggle, setToggle] = useState(false);
  const wishlist = useWishlist();
  const addCount = (event) => {
    event.stopPropagation();
    if (data?.balance - productCount > 0) setProductCount(productCount + 1);
    else
      showNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
        color: "red",
      });
  };

  const handleWishlist = async (event) => {
    event.stopPropagation();
    setToggle(!toggle);
    if (!toggle) {
      if (token) {
        const requestOption = {
          productid: data.id,
        };
        const res = await fetchMethod(
          "POST",
          "user/wishlist",
          token,
          requestOption
        );
        if (res.success) {
          wishlist.addItem(data);
          showNotification({
            message: res.message,
            icon: <IconCheck />,
            color: "green",
          });
        } else {
          showNotification({
            message: res?.message,
            color: "red",
            icon: (
              <IconCircleXFilled
                style={{
                  width: rem(30),
                  height: rem(30),
                }}
              />
            ),
          });
        }
      } else {
        showNotification({
          message: "Нэвтрэх шаардлагатай",
          color: "red",
          icon: (
            <IconCircleXFilled
              style={{
                width: rem(30),
                height: rem(30),
              }}
            />
          ),
        });
      }
    }
  };

  const minusCount = (event) => {
    event.stopPropagation();
    if (productCount > 1) setProductCount(productCount - 1);
  };

  const addToCartHandler = async (event) => {
    event.stopPropagation();
    if (data?.balance > 0) {
      if (token) {
        setLoading(true);
        const body = {
          product_id: data.id,
          quantity: productCount,
        };
        const fetchData = await fetchMethod("POST", "cart/add", token, body);
        if (fetchData?.success) {
          setLoading(false);
          SuccessNotification({
            message: data.name,
            title: "Сагсанд амжилттай орлоо!",
          });
          addCart({ ...data, quantity: productCount });
        } else {
          ErrorNotification({ title: "Алдаа гарлаа." });
        }
      } else {
        addCart({ ...data, quantity: productCount });
        SuccessNotification({
          message: data.name,
          title: "Сагсанд амжилттай орлоо!",
        });
      }
    } else {
      showNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
        color: "red",
      });
    }
  };

  const clickProduct = (e) => {
    e.preventDefault();
    router.push({
      shallow: true,
      pathname: "/product/[id]",
      query: { id: data.id },
    });
  };

  return (
    <div
      key={key ? key : null}
      onClick={(e) => clickProduct(e)}
      className={
        shouldScale
          ? "transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
          : "hover:cursor-pointer"
      }
    >
      <div className="flex flex-col justify-between items-center py-4 px-4 bg-white rounded-md w-full h-[25rem] relative">
        {src ? (
          <div className="h-96 w-48 relative">
            <Image
              src={src}
              className="product-card-img"
              fill
              loader={() => src}
              alt={src}
            />
          </div>
        ) : (
          <div className="product-card-img h-96 w-full flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md">
            <ThemeIcon size="lg" variant="light" color="green">
              <IconPhotoOff size="80%" stroke={0.5} />
            </ThemeIcon>

            <Text size="sm" weight={300}>
              Зураггүй{" "}
            </Text>
          </div>
        )}

        <div className="flex flex-col items-start w-full h-[15rem] justify-between">
          <Text className="text-2xl mt-1 text-start" lineClamp={2}>
            {data?.name}
          </Text>
          <div className="flex flex-col w-full">
            {data?.balance && (
              <div className="flex flex-row items-center  mt-1 gap-1">
                <p className="text-[#696A6C] font-semibold text-xs">
                  Үлдэгдэл :{" "}
                </p>
                {data?.balance > 10 ? (
                  <Badge size="xs" color="teal">
                    Хангалттай
                  </Badge>
                ) : data?.balance <= 10 ? (
                  <p className="text-xs font-semibold ">{data?.balance}</p>
                ) : (
                  <Badge size="xs" color="yellow">
                    Үлдэгдэлгүй
                  </Badge>
                )}
              </div>
            )}
            <div className="flex flex-row justify-between items-center">
              <p className="font-semibold text-base mt-1 text-start">
                {data?.listPrice}₮
              </p>
              <ActionIcon onClick={(event) => handleWishlist(event)}>
                {toggle ? (
                  <IconHeartFilled
                    stroke={2}
                    size={rem(23)}
                    style={{ color: "#F9BC60" }}
                  />
                ) : (
                  <IconHeart stroke={2} size={rem(23)} color="#F9BC60" />
                )}
              </ActionIcon>
            </div>
            <div className="flex flex-col md:flex-row  gap-4 w-full mt-1 justify-between">
              <div className="flex flex-row items-center">
                <Button
                  variant={"outline"}
                  className="flex justify-center items-center border rounded-md"
                  color={"#f9bc60"}
                  style={{ border: "1px solid #f9bc60", padding: "10px" }}
                  onClick={(event) => minusCount(event)}
                >
                  <Image
                    src="/icons/minus.svg"
                    width={13}
                    height={6}
                    alt="minus"
                  />
                </Button>
                <p className="text-center text-sm ml-2 mr-2 font-semibold">
                  {productCount}
                </p>
                <Button
                  variant={"outline"}
                  className="flex justify-center items-center rounded-md"
                  style={{ border: "1px solid #f9bc60", padding: "10px" }}
                  onClick={(event) => addCount(event)}
                >
                  <Image src="/icons/add.svg" width={13} height={6} alt="add" />
                </Button>
              </div>
              <Button
                variant={"filled"}
                className="bg-button-yellow rounded-md  hover:cursor-pointer"
                color={"yellow"}
                onClick={(event) => addToCartHandler(event)}
              >
                {loading === true ? (
                  <LoadingOverlay
                    loaderProps={{ size: "sm", color: "white" }}
                    overlayOpacity={0.1}
                    visible={loading}
                  />
                ) : (
                  <div className="flex items-center">
                    <p className="text-sm text-white font-semibold ">Сагслах</p>
                    {/* <Image width={18} height={18} src={"/icons/trolley2.svg"} /> */}
                  </div>
                )}
              </Button>
            </div>
            {/* <Button
              variant={"filled"}
              style={{ width: "100%" }}
              className="flex justify-center items-center p-1 bg-button-yellow rounded-md mt-1 hover:cursor-pointer"
              color={"orange"}
              onClick={(event) => addToCartHandler(event, data)}
            >
              {loading === true ? (
                <LoadingOverlay
                  loaderProps={{ size: "sm", color: "white" }}
                  overlayOpacity={0.1}
                  visible={loading}
                />
              ) : (
                <div className="flex items-center">
                  <p className="text-sm text-white font-semibold ">Сагслах</p>
                  <Image
                    className="ml-2"
                    width={18}
                    height={18}
                    src={"/icons/trolley2.svg"}
                  />
                </div>
              )}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
