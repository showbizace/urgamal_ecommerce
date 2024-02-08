import ProductWishlist from "@/components/ProductWishlist";
import { fetchMethod } from "@/utils/fetch";
import { Loader, Title, rem } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCircleXFilled, IconHeartOff } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    setLoading(true);
    const token = getCookie("token");
    const data = await fetchMethod("GET", "user/wishlist", token);
    if (data.success) {
      setWishlist(data.data);
      setLoading(false);
    } else {
      showNotification({
        message: data?.message,
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      <Title order={3}>Хадгалсан бараа</Title>
      <div className="mt-4 overflow-auto max-h-96 w-full">
        {loading ? (
          <div className="w-full flex items-center justify-center h-96">
            <Loader color="yellow" />
          </div>
        ) : wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <ProductWishlist data={item} key={index} refresh={getWishlist} />
          ))
        ) : (
          <div className="min-h-full h-72 flex flex-col items-center justify-center">
            <IconHeartOff size="2rem" stroke={1.5} />
            <span className="mt-2 font-medium text-base text-grey">
              Таны таалагдсан бараа хоосон байна.
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-row justify-end items-center">
        {/* <Button
          variant="transparent"
          styles={(theme) => ({
            label: {
              fontSize: rem(14),
              fontWeight: "400",
            },
          })}
          leftIcon={
            <IconTrashX
              style={{ width: rem(25), height: rem(25) }}
              stroke={2}
              color="red"
            />
          }
        >
          Бүгдийг устгах
        </Button> */}
      </div>
    </div>
  );
};

export default Wishlist;
