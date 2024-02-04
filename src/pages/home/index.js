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
import { useDisclosure } from "@mantine/hooks";
import { fetcher, getCategory } from "@/utils/fetch";
import ProductListWithCategory from "@/components/ProductListWithCategory/ProductListWithCategory";

const PAGE_SIZE = 20;

export async function getStaticProps() {
  try {
    const requestOption = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product?offset=0&limit=${PAGE_SIZE}`,
      requestOption
    );

    const catResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/config/home`,
      requestOption
    );

    const cats = await catResponse.json();
    const data = await res.json();

    return {
      props: {
        data,
        cats,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        cats: [],
      },
    };
  }
}

export default function Home({ data, cats }) {
  const userConfigs = useContext(UserConfigContext);
  const { preference_cookie, configId } = userConfigs;
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [positionSticky, setPositionSticky] = useState(false);

  const [opened, { open, close }] = useDisclosure(true);

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

  //! zasah
  // const [products, setProducts] = useState([]);

  // const {
  //   data: fetchData,
  //   mutate,
  //   size,
  //   setSize,
  // } = useSWRInfinite((index) => {
  //   `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
  //     index + 1
  //   }&limit=${PAGE_SIZE}`,
  //     fetcher,
  //     { revalidateFirstPage: false };
  // });

  // useEffect(() => {
  //   if (fetchData && fetchData.length > 0) {
  //     setProducts((prevProducts) =>
  //       prevProducts.concat(...fetchData[fetchData.length - 1].result)
  //     );
  //   }
  // }, [fetchData]);

  // const isEmpty = fetchData?.[0]?.length === 0;

  // const isReachingEnd =
  //   isEmpty ||
  //   (fetchData && fetchData[fetchData.length - 1]?.length < PAGE_SIZE);

  // useEffect(() => {
  //   window.addEventListener("scroll", infiniteScroll);
  //   return () => window.removeEventListener("scroll", infiniteScroll);
  // }, [fetchData]);

  // const infiniteScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 350 >=
  //       document.documentElement.offsetHeight &&
  //     !isEmpty &&
  //     !isReachingEnd
  //   )
  //     setSize(size + 1);
  // };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    window.dispatchEvent(new Event("storage"));
    // setProducts(data.result);
    fetchCategory();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const fetchCategory = async () => {
    setCategoriesLoading(true);

    const data = await getCategory();

    if (data) {
      setCategoriesLoading(false);
      setCategories(data);
    } else {
      setCategoriesLoading(true);
    }
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
            <div className="hidden lg:flex flex-col lg:flex-row bg-white mt-2 rounded-sm py-5">
              <div className="py-3 text-xxl h-[390px] overflow-x-hidden overflow-y-auto">
                {configId && categories && (
                  <AllCategory
                    categories={categories}
                    isLoading={categoriesLoading}
                  />
                )}
              </div>
              <div className="relative rounded w-full">
                <Banner />
              </div>
            </div>
            {configId &&
              cats?.success &&
              cats?.result?.categories.map((item, idx) => {
                if (idx !== 0) {
                  return (
                    <ProductListWithCategory
                      key={`list-with-category-${idx}`}
                      categoryId={item?.id}
                      categoryName={item?.name}
                      // categoryIcon={el?.icon}
                      cols={5}
                      className="mt-12"
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
