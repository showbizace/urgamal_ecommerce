/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Category from "@/components/AllCategory/category";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import ProductCard from "@/components/product-card";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import { Breadcrumbs, Button, rem } from "@mantine/core";
import { fetchMethod, fetcher, getCategory } from "@/utils/fetch";
import { PAGE_SIZE } from "@/utils/constant";

export async function getServerSideProps({ query }) {
  const { catId } = query;
  const data = await fetchMethod(
    "GET",
    `product?offset=0&limit=${PAGE_SIZE}&query=&categoryId=${catId}`
  );
  return {
    props: {
      initialData: data,
    },
  };
}

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { catId } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
        (index + 1) * 20
      }&limit=${PAGE_SIZE}&query=&categoryId=${catId}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  const isEmpty = products?.length === 0;
  const fetchMore = async () => {
    setLoading(true);
    if (total === data?.length) {
      return;
    }
    setSize((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (data?.length > 0) {
      setProducts(products.concat(data[data?.length - 1]));
    }
  }, [data]);

  // const getCurrentCategoryPath = (parent, child) => {
  //   if (type === "parent") {
  //     const current = parent.find((e) => e.id == catName);
  //     if (current) {
  //       return [
  //         {
  //           title: current.name,
  //           href: `/category/parent/${current.id}`,
  //         },
  //       ];
  //     } else {
  //       return [];
  //     }
  //   } else if (type === "child") {
  //     const current = child.find((e) => e.id == catName);
  //     if (current) {
  //       const parentCat = parent.find((e) => e.id == current.parent_id);
  //       return [
  //         {
  //           title: parentCat ? parentCat.name : "",
  //           href: `/category/parent/${parentCat ? parentCat.id : ""}`,
  //         },
  //         {
  //           title: current.name,
  //           href: `/category/child/${current.id}`,
  //         },
  //       ];
  //     } else {
  //       return [];
  //     }
  //   } else {
  //     return [];
  //   }
  // };
  // const currentCategoryPath = useMemo(
  //   () => getCurrentCategoryPath(parent, child),
  //   [parent, child, router.asPath]
  // );

  useEffect(() => {
    setLoading(true);
    setProducts(initialData?.result);
    setLoading(false);
    setTotal(initialData?.meta?.total);
  }, [initialData]);

  function categoryPositioner() {
    var navbar = document.getElementById("category-menu");
    var content = document.getElementById("content");
    var sticky = navbar.offsetTop;
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("fixed", "top-16");
    } else {
      navbar.classList.remove("fixed", "top-16");
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", categoryPositioner);
    return () => {
      window.removeEventListener("scroll", categoryPositioner);
    };
  }, []);

  return (
    <GlobalLayout>
      <div>
        <div className="px-4 md:px-10 h-full">
          <div className="h-full flex flex-row py-6 md:py-12 justify-between gap-10">
            <div className="w-[27rem] hidden lg:block">
              <Category padding="1rem" />
            </div>
            <div
              className="flex flex-row w-full h-full"
              style={{ gap: "30px", flexWrap: "wrap" }}
              id={"content"}
            >
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row items-center">
                  {/* <Breadcrumbs mt="xs">
                    {[
                      {
                        title: "Нүүр",
                        href: `/`,
                      },
                      ...currentCategoryPath,
                    ].map(({ title, href }, index) => (
                      <Link
                        href={href}
                        key={title + index}
                        className="text-sm text-grey hover:underline"
                      >
                        {title}
                      </Link>
                    ))}
                  </Breadcrumbs> */}
                </div>
                <div className="flex justify-center items-center bg-white flex-row  px-4 py-2">
                  <p className="font-semibold text-sm text-[#3E503C]">
                    Эрэмбэлэх
                  </p>
                  <Image
                    width={13}
                    height={13}
                    src={"/icons/arrow-down-outline.svg"}
                    className="ml-2 mt-1"
                    alt="arrow-down"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <ProductGridList
                  showSkeleton={loading}
                  emptyStateMessage="Ангиллын бараа олдсонгүй"
                  isEmpty={isEmpty}
                  // query={
                  //   type === "parent"
                  //     ? parent.find((e) => e.id === catName)?.name
                  //     : type === "child"
                  //     ? parent.find((e) => e.id === catName)?.name
                  //     : ""
                  //     ? parent.find((e) => e.id === catName)?.name
                  //     : ""
                  // }
                >
                  {products?.map((e, index) => (
                    <ProductCard
                      key={`product-card-key-${index}-${e?.id}`}
                      src={e?.product_image?.images?.[0]}
                      data={e}
                    />
                  ))}
                </ProductGridList>
                {total !== products?.length && (
                  <div className="flex justify-center items-center mt-8">
                    <Button
                      variant="outline"
                      color="yellow"
                      onClick={() => fetchMore()}
                    >
                      Цааш үзэх
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default CategoryPage;
