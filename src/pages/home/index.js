import Head from "next/head";

import Category from "../../components/category";
import FeatureBundle from "../../components/feature-bundle";
import FeatureProduct from "../../components/feature-product";
import Image from "next/image";

import ProductCard from "../../components/product-card";
import { Skeleton } from "@mantine/core";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import FeatureProductList from "../../components/feature-product-list";
import NewProduct from "../../components/new-product";
import Banner from "../../components/banner";
import BottomFooter from "../../components/Footer";
import { useRouter } from "next/router";
import { useEffect, useCallback, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MySkeleton from "@/components/MySkeleton";
import Loading from "./loading";
import useSWRInfinite from "swr/infinite";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import axios from "axios";
const PAGE_SIZE = 20;

const fetcher = (url) =>
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => console.log(error));
export async function getStaticProps() {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/local?offset=0&limit=${PAGE_SIZE}`,
    requestOption
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [positionSticky, setPositionSticky] = useState(false);
  const [products, setProducts] = useState([]);

  const [main, setMain] = useState([]);
  const [parent, setParent] = useState([]);
  const [child, setChild] = useState([]);

  const onScroll = useCallback((event) => {
    const { pageYOffset, scrollY, innerHeight } = window;
    const bottom = document.documentElement.scrollHeight;
    if (
      (pageYOffset >= 1308 || scrollY >= 1308) &&
      (pageYOffset < bottom - 800 || scrollY < bottom - 800)
    ) {
      setPositionSticky(true);
    } else {
      setPositionSticky(false);
    }
    if (innerHeight + Math.ceil(pageYOffset) >= document.body.offsetHeight) {
      setPositionSticky(false);
    }
  }, []);

  const {
    data: fetchData,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
    error,
  } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product/local?offset=${
        index + 1
      }&limit=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false }
  );
  useEffect(() => {
    fetchData &&
      !isEmpty &&
      setProducts(products.concat(...fetchData?.[fetchData.length - 1]));
  }, [fetchData]);
  const isLoadingMore =
    isLoading ||
    (size > 0 && fetchData && typeof fetchData[size - 1] === "undefined");
  const isEmpty = fetchData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (fetchData && fetchData[fetchData.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && fetchData && fetchData.length === size;
  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 350 >=
        document.documentElement.offsetHeight &&
      !isEmpty &&
      !isReachingEnd
    )
      setSize(size + 1);
  };
  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, [fetchData]);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    window.dispatchEvent(new Event("storage"));
    setProducts(data.data);
    getAllCategory();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const getAllCategory = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/category/all?type=separate`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        localStorage.setItem(
          "main",
          JSON.stringify(response.data.data.mainCats)
        );
        localStorage.setItem(
          "parent",
          JSON.stringify(response.data.data.parentCats)
        );
        localStorage.setItem(
          "child",
          JSON.stringify(response.data.data.childCats)
        );
        setMain(response.data.data.mainCats);
        setParent(response.data.data.parentCats);
        setChild(response.data.data.childCats);
      })
      .catch((error) => {
        if (error.response) {
          console.log();
        } else {
        }
      });
  };

  return (
    <div>
      <GlobalLayout>
        <Banner />
        <div className="px-10 mb-16">
          {/* <FeatureProduct /> */}
          {/* <FeatureBundle /> */}
          <div className="flex flex-row justify-between mt-12">
            <div style={{ width: "25%", height: "80%", position: "relative" }}>
              <Category
                positionSticky={positionSticky}
                parent={parent}
                main={main}
                child={child}
              />
            </div>
            <div className="flex flex-col md:w-[7x%] lg:w-[73%]">
              {/* <FeatureProductList /> */}
              {/* <NewProduct /> */}

              <ProductGridList showSkeleton={isLoading || isValidating}>
                {products.map((e, index) => (
                  <ProductCard
                    key={`product-card-key-${index}-${e.id}`}
                    src={e.product_image?.images?.[0]}
                    data={e}
                  />
                ))}
              </ProductGridList>
            </div>
          </div>
        </div>
        <BottomFooter />
      </GlobalLayout>
    </div>
  );
}
