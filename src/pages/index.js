import Head from "next/head";
import Banner from "./components/banner";
import Category from "./components/category";
import FeatureBundle from "./components/feature-bundle";
import FeatureProduct from "./components/feature-product";
import Navbar from "./components/navbar";
import Search from "./components/search";
import Image from "next/image";

import ProductCard from "./components/product-card";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="body">
        <Navbar />
        <Search />
        <Banner />
        <div className="px-32">
          <FeatureProduct />
          <FeatureBundle />
          <div className="flex flex-row">
            <Category />
            <div className="ml-10 w-full">
              <div
                className="flex flex-row justify-between"
                style={{ width: "100%" }}
              >
                <p className="text-lg font-semibold">Онцлох бүтээгдэхүүн</p>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center rounded-full bg-white w-7 ">
                    <Image src="/icons/arrow-left.svg" width={10} height={22} />
                  </div>
                  <div className="flex justify-center items-center rounded-full w-7 ml-2 bg-background-sort pl-1 ">
                    <Image
                      src="/icons/arrow-right.svg"
                      width={10}
                      height={22}
                    />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "3%", width: "97%" }}>
                <Swiper
                  className="category-swiper"
                  slidesPerView={4}
                  spaceBetween={30}
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
          </div>
        </div>
      </div>
    </div>
  );
}
