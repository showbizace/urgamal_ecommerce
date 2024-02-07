import Image from "next/image";
import {
  Button,
  Loader,
  LoadingOverlay,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import {
  IconCheck,
  IconCircleXFilled,
  IconPhotoOff,
} from "@tabler/icons-react";
import { fetchMethod } from "@/utils/fetch";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";
import { addCart } from "@/utils/Store";
import { useState } from "react";
const ProductWishlist = ({ data, refresh }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const token = getCookie("token");
    const requestOption = {
      product_id: data.productid,
    };
    const res = await fetchMethod(
      "DELETE",
      "user/wishlist",
      token,
      requestOption
    );
    if (res.success) {
      showNotification({
        message: "Амжилттай бараа устлаа.",
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
    refresh();
  };

  const handleCart = async () => {
    const token = getCookie("token");
    if (token) {
      setLoading(true);
      const body = {
        product_id: data.productid,
        quantity: 1,
      };
      const res = await fetchMethod("POST", "cart/add", token, body);
      if (res?.success) {
        addCart({ ...data, quantity: 1 });
        showNotification({
          message: "Сагсанд амжилттай орлоо!",
          icon: <IconCheck />,
          color: "green",
          title: `${data?.name}`,
        });
        setLoading(false);
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
      addCart({ ...data, quantity: 1 });
      showNotification({
        message: "Сагсанд амжилттай орлоо!",
        icon: <IconCheck />,
        color: "green",
        title: `${data?.name}`,
      });
    }
  };

  return (
    <div
      className="divide-b-4 divide-slate-700 w-full"
      style={{ borderBottom: "2px solid #DADEDE" }}
    >
      <div className="flex flex-row p-4  ">
        {data.product.additionalImage.length > 0 ? (
          <Image
            loader={() => data.product.additionalImage[0].url}
            src={data.product.additionalImage[0].url}
            alt={data.product.additionalImage[0].url}
            width={100}
            height={150}
            className="w-32 h-32 object-contain"
          />
        ) : (
          <div className="product-card-img flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md w-32 h-32 ">
            <ThemeIcon size="lg" variant="light" color="green">
              <IconPhotoOff size="80%" stroke={0.5} />
            </ThemeIcon>
          </div>
        )}

        <div className="flex flex-col justify-between ml-3 ">
          <Text size={"lg"}>{data.name}</Text>
          <div className="flex flex-row items-center">
            <Text className="" size={"sm"}>
              Ширхэг: {data.product.balance}
            </Text>
            <Text className="ml-4" size={"sm"}>
              Нэгж үнэ: {data.product.listPrice}
            </Text>
          </div>
          <div className="flex flex-row">
            <Button
              variant={"filled"}
              className="mr-4"
              onClick={handleCart}
              style={{
                backgroundColor: "#F9BC60",
                padding: "6px",
              }}
            >
              {loading ? (
                <div className="w-full items-center justify-center">
                  <Loader color="white" size={"xs"} />
                </div>
              ) : (
                "Сагсанд хийх"
              )}
            </Button>
            <Button
              variant={"outline"}
              color={"red"}
              style={{ fontWeight: "normal", padding: "6px" }}
              onClick={handleDelete}
            >
              Арилгах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWishlist;
