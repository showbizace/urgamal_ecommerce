import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProductCategory from "./product-category";

const FeatureProduct = () => {
  return (
    <div className="flex flex-col py-8">
      <div className="flex flex-row justify-between" style={{ width: "100%" }}>
        <p className="text-lg font-semibold">Онцлох бүтээгдэхүүн</p>
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
          slidesPerView={7}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide className="rounded-md">
            <ProductCategory
              src={"/icons/1.svg"}
              width={10}
              height={10}
              text={"Хөрс"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            <ProductCategory
              src={"/icons/2.svg"}
              width={10}
              height={10}
              text={"Цэцэг"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            <ProductCategory
              src={"/icons/3.svg"}
              width={10}
              height={10}
              text={"Бордоо"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            {" "}
            <ProductCategory
              src={"/icons/4.svg"}
              width={10}
              height={10}
              text={"Mод"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            {" "}
            <ProductCategory
              src={"/icons/5.svg"}
              width={10}
              height={10}
              text={"Үр"}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            {" "}
            <ProductCategory
              src={"/icons/6.svg"}
              width={10}
              height={10}
              text={"Багаж, хэрэгсэл "}
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md">
            {" "}
            <ProductCategory
              src={"/icons/7.svg"}
              width={10}
              height={10}
              text={"Ургамал хамгаалалааас"}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default FeatureProduct;
