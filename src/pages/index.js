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
import GlobalLayout from "./components/GlobalLayout/GlobalLayout";
import FeatureProductList from "./components/feature-product-list";
import NewProduct from "./components/new-product";

export default function Home() {
  return (
    <div>
      <GlobalLayout>
        <Banner />
        <div className="px-32">
          <FeatureProduct />
          <FeatureBundle />
          <div className="flex flex-row">
            <Category />
            <div className="flex flex-col ml-12 " style={{ width: "70%" }}>
              <FeatureProductList />
              <NewProduct />
              <div
                style={{ width: "100%", gap: "30px", flexWrap: "wrap" }}
                className="flex flex-row mt-12"
              >
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
                <div style={{ width: "22.425%" }}>
                  <ProductCard
                    src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row px-16 border-t-1 border-black mt-12 py-8 bg-green2 b justify-between">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" width={62} height={116} className="mx-4" />{" "}
            <p className="text-sm mt-2">“Таримал ургамал” ХХК</p>
            <div className="flex flex-row mt-4 gap-8">
              <Image src={"/icons/call2.svg"} width={20} height={20} />
              <Image src={"/icons/instagram.svg"} width={20} height={20} />
              <Image src={"/icons/facebook.svg"} width={20} height={20} />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Бидний тухай</p>
            <p className="text-sm mt-2">Вэб үйлчилгээ</p>
            <p className="text-sm mt-2">Бүтээгдэхүүн үйлчилгээ</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Тусламж</p>
            <p className="text-sm mt-2">Хэрэглэх заавар</p>
            <p className="text-sm mt-2">Түгээмэл асуулт</p>
            <p className="text-sm mt-2">Үйлчилгээний нөхцөл</p>
            <p className="text-sm mt-2">Нууцлалын баталгаа</p>
          </div>
          <div className="flex flex-col" style={{ width: "30%" }}>
            <p className="text-sm mt-2">Холбоо барих</p>
            <div className="flex flex-row items-start mt-1">
              <Image
                className="m-1"
                src={"/icons/location.svg"}
                width={20}
                height={20}
              />
              <p className="text-sm ml-2">
                Хаяг: Улаанбаатар хот, Баянзүрх дүүрэг, 12-р хороолол, 1-р хороо
                , 20/2 байр, Таримал ургамлын үрийн дэлгүүр
              </p>
            </div>
            <div className="flex flex-row items-center mt-2">
              <Image
                className="m-1"
                src={"/icons/call.svg"}
                width={18}
                height={18}
              />
              <p className="text-sm ml-2">Утас: 72720808</p>
            </div>
            <div className="flex flex-row items-start mt-1">
              <Image
                className="m-1"
                src={"/icons/mail.svg"}
                width={20}
                height={20}
              />
              <p className="text-sm ml-2">
                И-мэйл хаяг: tarimalurgamal2016@gmail.com
              </p>
            </div>
          </div>
        </div>
      </GlobalLayout>
    </div>
  );
}
