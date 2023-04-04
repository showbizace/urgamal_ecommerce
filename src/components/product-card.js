import Image from "next/image";

import { Text, Button, LoadingOverlay } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { getCookie } from "cookies-next";
import { notifications, showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { SuccessNotification } from "../utils/SuccessNotification";
const ProductCard = ({ src, data }) => {
  const [productCount, setProductCount] = useState(1);
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const addCount = (event, count) => {
    event.stopPropagation();
    if (count - productCount > 0) {
      setProductCount(productCount + 1);
    } else {
      console.log("aldaa garlaa");
    }
  };

  const minusCount = (event) => {
    event.stopPropagation();
    if (productCount > 1) {
      setProductCount(productCount - 1);
    } else {
      console.log("aldaa garlaa");
    }
  };
  const addToCartHandler = async (event, data) => {
    event.stopPropagation();
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...data, quantity: 1, purchaseCount: productCount },
    });
    setLoading(true);
    const token = getCookie("token");
    if (token !== undefined && token !== null && token !== "") {
      console.log(token, "token");
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
        console.log(data, "data");
        if (data.success === true) {
          console.log("sucesssss");
          SuccessNotification({
            message: "Сагсанд амжилттай орлоо.!",
            title: "Сагс",
          });
          setLoading(false);
        }
      }
    } else {
      console.log("sucesssss");
      SuccessNotification({
        message: "Сагсанд амжилттай орлоо.!",
        title: "Сагс",
      });
      setLoading(false);
    }
  };
  return (
    <div
      className="flex flex-col justify-between items-center py-4 px-4 bg-white rounded-md"
      style={{ width: "100%", height: "400px" }}
    >
      <Image
        src={src}
        className="product-card-img"
        width={40}
        height={40}
        loader={() => src}
        alt={src}
      />
      <div className="flex flex-col justify-start items-start">
        <Text className="text-2xl mt-1" lineClamp={2}>
          {data?.name}
        </Text>
        <div className="flex flex-row mt-1">
          {data?.instock < 10 ? (
            <>
              <p className="text-[#696A6C] font-semibold text-xs">
                Үлдэгдэл :{" "}
              </p>
              <p className="text-xs font-semibold ml-1">
                {data?.instock}
                {data?.unit}
              </p>
            </>
          ) : data?.instock > 0 ? (
            <p className="text-[#696A6C] font-semibold text-xs">үлдэгдэлгүй</p>
          ) : (
            ""
          )}
        </div>
        <p className="font-semibold text-base mt-1">{data?.price}₮</p>
        <div className="flex flex-row w-full mt-1 justify-between">
          <Button
            variant={"filled"}
            color="red"
            style={{ padding: "10px" }}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="flex justify-center items-center bg-tertiary rounded-md "
          >
            <Image width={18} height={8} src="/icons/hearth2.svg" />
          </Button>
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
              <Image src="/icons/minus.svg" width={13} height={6} />
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
              <Image src="/icons/add.svg" width={13} height={6} />
            </Button>
          </div>
        </div>
        <Button
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
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
