import BottomFooter from "@/components/Footer";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import MySkeleton from "@/components/MySkeleton";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import Category from "@/components/category";
import ProductCard from "@/components/product-card";
import { Grid, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconSearch, IconSearchOff } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import useSWRInfinite from "swr/infinite";
const fetcher = (url) =>
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => console.log(error));
const PAGE_SIZE = 25;
export default function SearchResult() {
  const router = useRouter();
  const { q } = router.query;
  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index) =>
        `${process.env.NEXT_PUBLIC_API_URL}/product/local?offset=${index}&limit=${PAGE_SIZE}&query=${q}`,
      fetcher,
      { revalidateFirstPage: false }
    );
  const products = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  const parentRef = useRef();

  const [main, setMain] = useState();
  const [parent, setParent] = useState();
  const [child, setChild] = useState();
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
  }, [data]);

  useEffect(() => {
    window.dispatchEvent(new Event("storage"));

    getAllCategory();

    console.log(data, "data");
    console.log(error, "error");
    // getProduct();
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

  const ItemContainer = <div className=" p-2 w-1/3 flex flex-none md:w-1/2 " />;

  const ItemWrapper = (
    <div className=" flex-1 h-24 w-24 border-solid border-black border-8"></div>
  );

  const ListContainer = <div className="flex flex-wrap "></div>;
  return (
    <GlobalLayout>
      <div className="flex w-full min-h-screen px-10 py-12 gap-6">
        <div className="max-w-[30vw] w-[30vw]">
          <Category
            positionSticky={false}
            parent={parent}
            main={main}
            child={child}
          />
        </div>
        {isEmpty && (
          <div className="w-full h-full flex justify-center items-start mt-32">
            <Stack align="center">
              <IconSearch size="2rem" stroke={1.5} />
              <Text size="lg" weight={500}>
                Хайлт илэрцгүй
              </Text>
              <Text size="md" weight={500}>
                "{q}"{" "}
                <Text span size="md" weight={400}>
                  хайлтад тохирох бараа олдсонгүй
                </Text>
              </Text>
            </Stack>
          </div>
        )}
        {/* <div 
          ref={parentRef}
          className="w-full mb-8 h-screen max-h-screen overflow-y-scroll"
        > 
           <VirtuosoGrid
            data={products}
            endReached={() => setSize(size + 1)}
            useWindowScroll
            customScrollParent={parentRef.current}
            itemClassName="md:w-[20%]  m-8"
            listClassName="flex flex-wrap"
            itemContent={(index) => (
              <div
                key={`${index}-${products[index].id}`}
                onClick={() => clickProduct(e)}
                className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
              >
                <ProductCard src={"/bundle-1.svg"} data={products[index]} />
              </div>
            )}
            
          /> 
        </div> */}
        <ProductGridList showSkeleton={isLoading || isValidating}>
          {products.map((e, index) => (
            <div
              key={`${index}-${e.id}`}
              onClick={() => clickProduct(e)}
              className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
            >
              <ProductCard
                src={
                  e.product_image !== null && e.product_image.images[0] !== null
                    ? `${e.product_image.images[0]}`
                    : "/bundle-1.svg"
                }
                data={e}
              />
            </div>
          ))}
        </ProductGridList>
      </div>
      <BottomFooter />
    </GlobalLayout>
  );
}
