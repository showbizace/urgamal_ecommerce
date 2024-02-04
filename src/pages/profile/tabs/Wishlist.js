import ProductCardProfile from "@/components/ProductCardProfile";
import { Button, Title, rem } from "@mantine/core";
import { IconShoppingCart, IconTrashX } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const Wishlist = () => {
  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      <Title order={3}>Хадгалсан бараа</Title>
      <div className="mt-4">
        <ProductCardProfile
          src={"/bundle-1.svg"}
          name={"Энерген Экстра"}
          count={"50ш"}
          price={"15’000₮"}
        />
        <ProductCardProfile
          src={"/bundle-1.svg"}
          name={"Энерген Экстра"}
          count={"50ш"}
          price={"15’000₮"}
        />
        <ProductCardProfile
          src={"/bundle-1.svg"}
          name={"Энерген Экстра"}
          count={"50ш"}
          price={"15’000₮"}
        />
      </div>
      <div className="mt-4 flex flex-row justify-between items-center">
        <Button
          variant="transparent"
          styles={(theme) => ({
            label: {
              fontSize: rem(14),
              fontWeight: "400",
            },
          })}
          leftIcon={
            <IconShoppingCart
              style={{ width: rem(25), height: rem(25), color: "#000" }}
              stroke={2}
            />
          }
        >
          Бүгдийг сагслах
        </Button>
        <Button
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
        </Button>
      </div>
    </div>
  );
};

export default Wishlist;
