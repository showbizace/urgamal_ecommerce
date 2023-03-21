import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Bundle from "./bundle";

const FeatureBundle = () => {
  return (
    <div className=" flex flex-col pb-8">
      <div className="flex flex-row justify-between" style={{ width: "100%" }}>
        <p className="text-lg font-semibold">Онцлох багц</p>
        <div className="flex flex-row">
          <div className="flex justify-center items-center rounded-full bg-white w-7 ">
            <Image src="/icons/arrow-left.svg" width={10} height={22} />
          </div>
          <div className="flex justify-center items-center rounded-full w-7 ml-2 bg-background-sort pl-1 ">
            <Image src="/icons/arrow-right.svg" width={10} height={22} />
          </div>
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "3%" }}>
        <Swiper
          className="category-swiper"
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide className="rounded-md">
            <Bundle src={"/bundle-1.svg"} name={"Энерген Экстра"} count={"108ш"} price={"150’000₮"} productIndex={2323} />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            {" "}
            <Bundle src={"/bundle-2.svg"} name={"Энерген Экстра"} count={"108ш"} price={"150’000₮"} productIndex={2323} />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            {" "}
            <Bundle src={"/bundle-3.svg"} name={"Энерген Экстра"} count={"108ш"} price={"150’000₮"} productIndex={2323} />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            {" "}
            <Bundle src={"/bundle-4.svg"} name={"Энерген Экстра"} count={"108ш"} price={"150’000₮"} productIndex={2323} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default FeatureBundle;
