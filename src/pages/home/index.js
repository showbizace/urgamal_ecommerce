import Category from "../../components/category";

import ProductCard from "../../components/product-card";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import Banner from "../../components/banner";
import BottomFooter from "../../components/Footer";
import { useEffect, useCallback, useState } from "react";
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
        <div className="px-10 mb-16">
          {/* <FeatureProduct /> */}
          {/* <FeatureBundle /> */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-row mt-12 rounded-md bg-white">
              <div className="w-1/4 h-[380px] px-6 py-4 overflow-auto ">
                <Category
                  positionSticky={positionSticky}
                  parent={parent}
                  main={main}
                  child={child}
                />
              </div>
              <div className="rounded w-3/4 p-4">
                <Banner />
              </div>
            </div>
            <div className="flex flex-col mt-12 md:w-[7x%] lg:w-[100%]">
              {/* <FeatureProductList /> */}
              {/* <NewProduct /> */}

              <ProductGridListF
                showSkeleton={isLoading || isValidating}
                cols={5}
              >
                {products.map((e, index) => (
                  <ProductCard
                    key={`product-card-key-${index}-${e.id}`}
                    src={e.product_image?.images?.[0]}
                    data={e}
                  />
                ))}
              </ProductGridListF>
            </div>
          </div>
        </div>
        <BottomFooter />
      </GlobalLayout>
    </div>
  );
}
