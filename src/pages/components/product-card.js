import Image from "next/image";

import { Text, Button } from '@mantine/core';

const ProductCard = ({ src, name, count, price }) => {
  return (
    <div
      className="flex flex-col justify-start items-center py-4 px-4 bg-white rounded-md"
      style={{ width: "100%", height: "300px" }}
    >
      <Image src={src} width={10} height={10} className="product-card-img" />
      <div
        className="flex flex-col justify-start items-start"
        style={{ width: "90%" }}
      >
        <Text className="text-sm mt-1" lineClamp={2}>{name}</Text>
        <div className="flex flex-row mt-1">
          <p className="text-[#696A6C] font-semibold text-xs">Үлдэгдэл : </p>
          <p className="text-xs font-semibold ml-1">{count}</p>
        </div>
        <p className="font-semibold text-base mt-2">{price}</p>
        <div className="flex flex-row w-full mt-1 justify-between">
          <div className="flex justify-center items-center bg-tertiary rounded-md px-1.5 py-1 ">
            <Image width={18} height={8} src="/icons/hearth2.svg" />
          </div>
          <div className="flex flex-row">
            <div
              className="flex justify-center items-center border p-2 rounded-md"
              style={{ border: "1px solid #f9bc60" }}
            >
              <Image src="/icons/minus.svg" width={15} height={6} />
            </div>
            <p className="text-center ml-2 mr-2">5</p>
            <div
              className="flex justify-center items-center p-2 rounded-md"
              style={{ border: "1px solid #f9bc60" }}
            >
              <Image src="/icons/add.svg" width={15} height={6} />
            </div>
          </div>
        </div>
        <Button variant={"filled"} className="w-full flex justify-center items-center p-1 bg-button-yellow rounded-md mt-1 hover:cursor-pointer" color={"orange"}>
          <p className="text-sm text-white font-semibold ">Сагслах</p>
          <Image className="ml-2" width={18} height={18} src={"/icons/trolley2.svg"} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
