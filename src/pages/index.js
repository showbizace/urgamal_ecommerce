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
            <div className="flex flex-col ml-12" style={{ width: "70%" }}>
              <FeatureProductList />
              <NewProduct />
              <div className="w-full flex flex-row">
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
      </GlobalLayout>
    </div>
  );
}
