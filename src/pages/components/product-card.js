import Image from "next/image";

import { Text, Button } from '@mantine/core';
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";

const ProductCard = ({ src, data }) => {

  const [productCount, setProductCount] = useState(1)
  const { state, dispatch } = useContext(Store)

  const addCount = (count) => {
    if (count - productCount > 0) {
      setProductCount(productCount + 1)
    } else {
      console.log("aldaa garlaa")
    }
  }

  const minusCount = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1)
    } else {
      console.log("aldaa garlaa")
    }
  }
  const addToCartHandler = () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...data, quantity: 1, purchaseCount: productCount } });
  }
  return (
    <div
      className="flex flex-col justify-start items-center py-4 px-4 bg-white rounded-md"
      style={{ width: "100%", height: "330px" }} onClick={() => { console.log("hello") }}
    >
      <Image src={src} width={10} height={10} className="product-card-img" />
      <div
        className="flex flex-col justify-start items-start"
        style={{ width: "90%" }}
      >
        <Text className="text-sm mt-1" lineClamp={2}>{data?.name}</Text>
        <div className="flex flex-row mt-1">
          <p className="text-[#696A6C] font-semibold text-xs">Үлдэгдэл : </p>
          <p className="text-xs font-semibold ml-1">{data.instock}</p>
        </div>
        <p className="font-semibold text-base mt-1">{data.price}₮</p>
        <div className="flex flex-row w-full mt-1 justify-between">
          <Button
            variant={"filled"}
            color="red"
            style={{ padding: "10px" }}
            className="flex justify-center items-center bg-tertiary rounded-md ">

            <Image width={18} height={8} src="/icons/hearth2.svg" />
          </Button>
          <div className="flex flex-row items-center">
            <Button
              variant={"outline"}
              className="flex justify-center items-center border rounded-md"
              color={"#f9bc60"}
              style={{ border: "1px solid #f9bc60", padding: "10px" }}
              onClick={() => { minusCount(data.instock) }}
            >
              <Image src="/icons/minus.svg" width={13} height={6} />
            </Button>
            <p className="text-center text-sm ml-2 mr-2 font-semibold">{productCount}</p>
            <Button
              variant={"outline"}
              className="flex justify-center items-center rounded-md"
              style={{ border: "1px solid #f9bc60", padding: "10px" }}
              onClick={() => { addCount(data.instock) }}
            >
              <Image src="/icons/add.svg" width={13} height={6} />
            </Button>
          </div>
        </div>
        <Button variant={"filled"} style={{ width: "100%" }} className="flex justify-center items-center p-1 bg-button-yellow rounded-md mt-1 hover:cursor-pointer" color={"orange"} onClick={() => addToCartHandler()}>
          <p className="text-sm text-white font-semibold ">Сагслах</p>
          <Image className="ml-2" width={18} height={18} src={"/icons/trolley2.svg"} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
