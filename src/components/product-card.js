import Image from "next/image";

import { Text, Button, LoadingOverlay, Badge, ThemeIcon } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { getCookie } from "cookies-next";
import { notifications, showNotification } from "@mantine/notifications";
import { IconCheck, IconPhotoOff } from "@tabler/icons-react";
import { SuccessNotification } from "../utils/SuccessNotification";
import { useRouter } from "next/router";
const ProductCard = ({ key, src, data, shouldScale = true }) => {
  const [productCount, setProductCount] = useState(1);
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addCount = (event, count) => {
    event.stopPropagation();
    if (count - productCount > 0) {
      setProductCount(productCount + 1);
    } else {
    }
  };

  const minusCount = (event) => {
    event.stopPropagation();
    if (productCount > 1) {
      setProductCount(productCount - 1);
    } else {
    }
  };
  const addToCartHandler = async (event, data) => {
    event.stopPropagation();
    console.log(data, "data");
    if (data.instock > 0) {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: { ...data, quantity: 1, purchaseCount: productCount },
      });
      setLoading(true);
      const token = getCookie("token");
      if (token !== undefined && token !== null && token !== "") {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        const requestOption = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            item_id: data.id,
            qty: productCount,
            businessId: "local_test",
          }),
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/add/local`,
          requestOption
        );
        if (res.status === 200) {
          const data = await res.json();
          if (data.success === true) {
            SuccessNotification({
              message: "Сагсанд амжилттай орлоо!",
              title: "Сагс",
            });
            setLoading(false);
          }
        }
      } else {
        SuccessNotification({
          message: "Сагсанд амжилттай орлоо!",
          title: "Сагс",
        });
        setLoading(false);
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
      query: { id: data.Id, data: data },
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
      <div
        className="flex flex-col justify-between items-center py-4 px-4 bg-white rounded-md "
        style={{ width: "100%", height: "400px" }}
      >
        {src ? (
          <div className="h-48 w-48 relative">
            <Image
              src={src}
              className="product-card-img"
              fill
              loader={() => src}
              alt={src}
            />
          </div>
        ) : (
          <div className="product-card-img h-48 w-full flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md">
            <ThemeIcon size="lg" variant="light" color="green">
              <IconPhotoOff size="80%" stroke={0.5} />
            </ThemeIcon>

            <Text size="sm" weight={300}>
              Зураггүй{" "}
            </Text>
          </div>
        )}

        <div className="flex flex-col justify-start items-start w-full">
          <Text className="text-2xl mt-1 text-start" lineClamp={2}>
            {data?.name}
          </Text>
          <div className="flex flex-row items-center justify-center mt-1 gap-1">
            <p className="text-[#696A6C] font-semibold text-xs">Үлдэгдэл : </p>
            {data?.instock > 10 ? (
              <Badge size="xs" color="teal">
                Хангалттай
              </Badge>
            ) : data?.instock <= 10 ? (
              <p className="text-xs font-semibold ">
                {data?.instock}
                {data?.unit}
              </p>
            ) : (
              <Badge size="xs" color="yellow">
                Үлдэгдэлгүй
              </Badge>
            )}
          </div>
          <p className="font-semibold text-base mt-1">{data?.price}₮</p>
          <div className="flex flex-col md:flex-row  gap-4 w-full mt-1 justify-between">
            {/* <Button
            variant={"filled"}
            color="red"
            style={{ padding: "10px" }}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="flex justify-center items-center bg-tertiary rounded-md "
          >
            <Image width={18} height={8} src="/icons/hearth2.svg" />
          </Button> */}

            <div className="flex flex-row items-center">
              <Button
                variant={"outline"}
                className="flex justify-center items-center border rounded-md"
                color={"#f9bc60"}
                style={{ border: "1px solid #f9bc60", padding: "10px" }}
                onClick={(event) => {
                  minusCount(event, data.instock);
                }}
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
                onClick={(event) => {
                  addCount(event, data.instock);
                }}
              >
                <Image src="/icons/add.svg" width={13} height={6} alt="add" />
              </Button>
            </div>
            <Button
              variant={"filled"}
              className="bg-button-yellow rounded-md  hover:cursor-pointer"
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
  );
};

export default ProductCard;
