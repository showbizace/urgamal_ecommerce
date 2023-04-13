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
// import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import useSWRInfinite from "swr/infinite";
const fetcher = (url) =>
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => console.log(error));
const PAGE_SIZE = 25;

export async function getServerSideProps({ query }) {
  const { q } = query;
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/local?offset=0&limit=${PAGE_SIZE}&query=${q}`,
    requestOption
  );
  const data = await res.json();
  return {
    props: {
      initialData: data.data,
    },
  };
}

export default function SearchResult({ initialData }) {
  const router = useRouter();
  const { q } = router.query;
  const [products, setProducts] = useState([]);
  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index) =>
        `${process.env.NEXT_PUBLIC_API_URL}/product/local?offset=${
          index + 1
        }&limit=${PAGE_SIZE}&query=${q}`,
      fetcher,
      { revalidateFirstPage: false }
    );

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
    data && !isEmpty && setProducts(products.concat(...data[data.length - 1]));
  }, [data]);
  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
    setProducts(initialData);
    getAllCategory();
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
                <ProductCard src={"/bundle-1.svg"} data={products[index]} /> 
            )}
            
          /> 
        </div> */}
        <ProductGridList
          showSkeleton={isLoading || isValidating}
          isEmpty={isEmpty}
          emptyStateMessage="хайлтад тохирох бараа олдсонгүй"
          query={q}
        >
          {products.map((e, index) => (
            <ProductCard
              key={`product-card-key-${index}-${e.id}`}
              src={e.product_image?.images?.[0]}
              data={e}
            />
          ))}
        </ProductGridList>
      </div>
    </GlobalLayout>
  );
}
