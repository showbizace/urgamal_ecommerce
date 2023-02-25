import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "./product-card";
const NewProduct = () => {
  return (
    <div style={{ width: "100%" }} className="mt-6">
      <div className="flex flex-row justify-between" style={{ width: "100%" }}>
        <p className="text-lg font-semibold">Шинэ бүтээгдэхүүн</p>
        <div className="flex flex-row">
          <div className="flex justify-center items-center rounded-full bg-white w-7 ">
            <Image src="/icons/arrow-left.svg" width={10} height={22} />
          </div>
          <div className="flex justify-center items-center rounded-full w-7 ml-2 bg-background-sort pl-1 ">
            <Image src="/icons/arrow-right.svg" width={10} height={22} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "3%", width: "100%" }}>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          auto
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide className="rounded-md">
            <ProductCard
              src={"/bundle-1.svg"}
              name={"Энерген Экстра"}
              count={"50ш"}
              price={"15’000₮"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            <ProductCard
              src={"/bundle-1.svg"}
              name={"Энерген Экстра"}
              count={"50ш"}
              price={"15’000₮"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            <ProductCard
              src={"/bundle-1.svg"}
              name={"Энерген Экстра"}
              count={"50ш"}
              price={"15’000₮"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            <ProductCard
              src={"/bundle-1.svg"}
              name={"Энерген Экстра"}
              count={"50ш"}
              price={"15’000₮"}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NewProduct;
