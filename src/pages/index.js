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
import Login from "./login";

export default function Home() {
  return (
    <Login />
  );
}
