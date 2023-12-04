/* eslint-disable react-hooks/exhaustive-deps */
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import Category from "@/components/category";
import ProductCard from "@/components/product-card";
import { fetchMethod, fetcher, getCategory } from "@/utils/fetch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 15;

export async function getServerSideProps() {
  const data = await fetchMethod("GET", "product");
  return {
    props: {
      initialData: data?.data?.result,
    },
  };
}

export default function SearchResult({ initialData }) {
  const router = useRouter();
  const { q } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data, size, setSize, isValidating, isLoading } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product?${
        index + 1
      }&limit=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

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
    data?.length > 0 &&
      setProducts(products.concat(...data.map((item) => item.result)));
    // data && !isEmpty && setProducts(products.concat(...data.result));
  }, [data]);

  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
    setProducts(initialData);
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const data = await getCategory();
    setMain(data);
    setLoading(false);
  };

  return (
    <GlobalLayout>
      <div className="flex w-full min-h-screen px-10 py-12 gap-6">
        <div className="min-w-[250px] w-[250px] max-w-[250px] hidden lg:block">
          <Category
            parent={main}
            child={child}
            padding="1rem"
            loading={loading}
            fetch={true}
            setProducts={setProducts}
          />
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
                key={`product-card-key-${index}-${e.id}`}
                src={e.product_image?.images?.[0]}
                data={e}
              />
            );
          })}
        </ProductGridList>
      </div>
    </GlobalLayout>
  );
}
