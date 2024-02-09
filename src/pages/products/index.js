/* eslint-disable react-hooks/exhaustive-deps */
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import Category from "@/components/AllCategory/category";
import ProductCard from "@/components/product-card";
import { PAGE_SIZE } from "@/utils/constant";
import { fetchMethod, fetcher, getCategory } from "@/utils/fetch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import useSWRInfinite from "swr/infinite";

export async function getServerSideProps() {
  const data = await fetchMethod("GET", "product");
  return {
    props: {
      initialData: data?.result,
    },
  };
}

export default function SearchResult({ initialData }) {
  const router = useRouter();
  const { q } = router.query;
  const [products, setProducts] = useState([]);
  const { data, size, setSize, isValidating, isLoading } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
        (index + 1) * 20
      }&limit=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  const isEmpty = data?.[0]?.length === 0;

  const [isFetch, setIsFetch] = useState(false);
  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 350 >=
        document.documentElement.offsetHeight &&
      !isEmpty
    ) {
      setIsFetch(true);
    }
  };

  useEffect(() => {
    if (isFetch) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [isFetch]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, [data]);

  useEffect(() => {
    if (data?.length > 0 && !isEmpty) {
      setProducts(products.concat(...data[data.length - 1]));
      setIsFetch(false);
    }
    // data && !isEmpty && setProducts(products.concat(...data.result));
  }, [data]);

  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
    setProducts(initialData);
  }, []);

  return (
    <GlobalLayout>
      <div className="flex w-full min-h-screen px-10 py-12 gap-6">
        <div className="min-w-[350px] w-[350px] max-w-[350px] hidden lg:block">
          <Category padding="1rem" />
        </div>

        <ProductGridList
          showSkeleton={isLoading || isValidating}
          isEmpty={isEmpty}
          emptyStateMessage="хайлтад тохирох бараа олдсонгүй"
          query={q}
        >
          {products.map((e, index) => {
            return (
              <ProductCard
                key={`product-card-key-${index}-${e?.id}`}
                src={e?.additionalImage?.images?.[0]}
                data={e}
              />
            );
          })}
        </ProductGridList>
      </div>
    </GlobalLayout>
  );
}
