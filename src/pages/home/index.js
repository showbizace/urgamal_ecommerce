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
export async function getStaticProps() {
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ limit: 20, offset: 0 }),
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/local`,
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
  const [isBottom, setIsBottom] = useState(false);
  const [productData, setProductData] = useState([]);
  const arr = [1, 2, 3, 4, 5, 6];
  const [offset, setOffset] = useState(0);
  const onScroll = useCallback((event) => {
    const wrappedElement = document.getElementById("content");
    if (isBottomhh(wrappedElement)) {
      setIsBottom(true);
      setOffset((prev) => prev + 1);
      window.removeEventListener("scroll", onScroll);
    }
    const { pageYOffset, scrollY, innerHeight } = window;
    const bottom = document.documentElement.scrollHeight;
    if (
      (pageYOffset >= 1308 || scrollY >= 1308) &&
      (pageYOffset < bottom - 800 || scrollY < bottom - 800)
    ) {
      setPositionSticky(true);
      console.log("true");
    } else {
      setPositionSticky(false);
      console.log("false");
    }
    if (innerHeight + Math.ceil(pageYOffset) >= document.body.offsetHeight) {
      setPositionSticky(false);
    }
  }, []);

  useEffect(() => {
    if (isBottom === true) {
      window.addEventListener("scroll", onScroll);
      getProduct();
    }
  }, [isBottom]);

  function isBottomhh(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const getProduct = async () => {
    console.log(offset, "offset");
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit: 20, offset: offset }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/local`,
      requestOption
    );
    const data = await res.json();
    const dataState = data.data;
    if (dataState.length > 0) {
      let temp = [...productData];
      const merge = temp.concat(dataState);
      setProductData(merge);
      setIsBottom(false);
    } else {
      window.removeEventListener("scroll", onScroll);
      setIsBottom(false);
    }
  };

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    window.dispatchEvent(new Event("storage"));
    setProductData(data.data);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const router = useRouter();
  const clickProduct = (e) => {
    router.push({
      shallow: true,
      pathname: "/product/[id]",
      query: { id: e.id, data: e },
    });
  };
  return (
    <div>
      <GlobalLayout>
        <Banner />
        <div className="px-32 mb-16">
          <FeatureProduct />
          <FeatureBundle />
          <div className="flex flex-row">
            <div style={{ width: "30%", height: "80%", position: "relative" }}>
              <Category positionSticky={positionSticky} />
            </div>
            <div className="flex flex-col ml-12 " style={{ width: "70%" }}>
              <FeatureProductList />
              <NewProduct />
              <Suspense fallback={<Loading />}>
                <div className="flex flex-col">
                  <div
                    style={{ width: "100%", gap: "30px", flexWrap: "wrap" }}
                    className="flex flex-row mt-12"
                    id={"content"}
                  >
                    {productData.map((e) => {
                      return (
                        <div
                          style={{ width: "22.3%" }}
                          onClick={() => clickProduct(e)}
                          className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
                        >
                          <ProductCard
                            src={
                              e.product_image !== null &&
                              e.product_image.images[0] !== null
                                ? `http://${e.product_image.images[0]}`
                                : "/bundle-1.svg"
                            }
                            data={e}
                          />
                        </div>
                      );
                    })}
                    {isBottom === true ? (
                      arr.map((e) => <MySkeleton />)
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {/* <div className="mt-6 flex justify-center items-center w-full">
                                    <LoadingOverlay
                                        loaderProps={{ size: 'sm', color: 'blue', }}
                                        visible={true}
                                    />
                                </div> */}
                </div>
              </Suspense>
            </div>
          </div>
        </div>
        <BottomFooter />
      </GlobalLayout>
    </div>
  );
}
