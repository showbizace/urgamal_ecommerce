/* eslint-disable react-hooks/exhaustive-deps */
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import Banner from "../../components/banner";
import { useEffect, useCallback, useState, useContext } from "react";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import Preference_modal from "@/components/preference_modal/preference_modal";
import axios from "axios";
import AllCategory from "@/components/AllCategory/AllCategory";
import { UserConfigContext } from "@/utils/userConfigContext";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import ProductListWithCategory from "@/components/ProductListWithCategory/ProductListWithCategory";
import { fetcher, getCategory } from "@/utils/fetch";
import { PAGE_SIZE } from "@/constant";

export async function getStaticProps() {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product?offset=0&limit=${PAGE_SIZE}`,
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
  const userConfigs = useContext(UserConfigContext);
  const { preference_cookie, configId } = userConfigs;

  const [opened, { open, close }] = useDisclosure(true);

  const [positionSticky, setPositionSticky] = useState(false);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState();
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
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/product/cats`, fetcher, {
    refreshInterval: 0,
  });

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
      `${process.env.NEXT_PUBLIC_API_URL}/product/local?offset=${index}&limit=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  // useEffect(() => {
  //   fetchData &&
  //     !isEmpty &&
  //     setProducts(products?.concat(...fetchData?.[fetchData.length - 1]));
  // }, [fetchData]);

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
    fetchCategory();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const fetchCategory = async () => {
    const data = await getCategory();
    setMain(data);
  };

  return (
    <GlobalLayout>
      {!userConfigs.configId && (
        <Preference_modal
          close={close}
          open={open}
          opened={opened}
          preference_cookie={preference_cookie}
        />
      )}
      <div className="block lg:hidden">
        <Banner />
      </div>
      <div className=" px-4 md:px-10  mb-16">
        {/* <FeatureProduct /> */}
        {/* <FeatureBundle /> */}
        <div className="flex flex-col justify-between relative">
          <div className="flex flex-col lg:w-[100%]">
            {/* <FeatureProductList /> */}
            {/* <NewProduct /> */}
            <div className="hidden lg:flex flex-col lg:flex-row bg-white mt-2 rounded-sm">
              <div className="py-3  text-xxl">
                {categoriesLoading && <div></div>}
                {categoriesError && <div></div>}
                {configId && categories && (
                  <AllCategory
                    categories={
                      categories.find(
                        (main) => main.id.toString() == userConfigs.configId
                      ).parent_categories
                    }
                    isLoading={categoriesLoading}
                  />
                )}
              </div>
              <div className="relative  rounded w-full">
                <Banner />
              </div>
            </div>
            {configId &&
              categories &&
              categories
                ?.find((main) => main.id.toString() == userConfigs.configId)
                .parent_categories.map((el) => {
                  return (
                    <ProductListWithCategory
                      key={`list-with-category-${el.id}`}
                      categoryId={el?.id}
                      categoryName={el?.name}
                      categoryIcon={el?.icon}
                      cols={5}
                      className="mt-12"
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
