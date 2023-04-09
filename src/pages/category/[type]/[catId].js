import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Category from "@/components/category";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import ProductCard from "@/components/product-card";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import BottomFooter from "@/components/Footer";
import { Breadcrumbs } from "@mantine/core";
import { IconArrowBadgeRight, IconChevronsRight } from "@tabler/icons-react";
const fetcher = (url) =>
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => console.log(error));
const PAGE_SIZE = 25;

export async function getServerSideProps({ query }) {
  const { type, catId } = query;
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/product/local?offset=0&limit=${PAGE_SIZE}&${type}_cat_id=${
        catId !== "undefined" ? catId : 0
      }`,
      requestOption
    );
    const data = await res.json();
    return {
      props: {
        initialData: data.data,
      },
    };
  } catch {
    return {
      props: {
        initialData: [],
      },
    };
  }
}

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { type, catId } = router.query;
  const [main, setMain] = useState([]);
  const [parent, setParent] = useState([]);
  const [child, setChild] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCurrentCategoryPath = (main, parent, child) => {
    if (type === "main") {
      const current = main.find((e) => e.id == catId);
      if (current) {
        return [
          {
            title: current.name,
            href: `/category/main/${current.id}`,
          },
        ];
      } else {
        return [];
      }
    } else if (type === "parent") {
      const current = parent.find((e) => e.id == catId);
      if (current) {
        const mainCat = main.find((e) => e.id == current.main_cat_id);
        return [
          {
            title: mainCat ? mainCat.name : "",
            href: `/category/main/${mainCat ? mainCat.id : ""}`,
          },
          {
            title: current.name,
            href: `/category/parent/${current.id}`,
          },
        ];
      } else {
        return [];
      }
    } else if (type === "child") {
      const current = child.find((e) => e.id == catId);
      console.log(current, "currentcurrent");
      if (current) {
        const mainCat = main.find((e) => e.id == current.main_cat_id);
        const parentCat = parent.find((e) => e.id == current.parent_id);
        return [
          {
            title: mainCat ? mainCat.name : "",
            href: `/category/main/${mainCat ? mainCat.id : ""}`,
          },
          {
            title: parentCat ? parentCat.name : "",
            href: `/category/parent/${parentCat ? parentCat.id : ""}`,
          },
          {
            title: current.name,
            href: `/category/child/${current.id}`,
          },
        ];
      } else {
        return [];
      }
    } else {
      return [];
    }
  };
  const currentCategoryPath = useMemo(
    () => getCurrentCategoryPath(main, parent, child),
    [main, parent, child, router.pathname]
  );
  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index) =>
        `${process.env.NEXT_PUBLIC_API_URL}/product/local?offset=${
          index + 1
        }&limit=${PAGE_SIZE}&${type}_cat_id=${catId}`,
      fetcher,
      { revalidateFirstPage: false }
    );

  useEffect(() => {
    setSize(1);
  }, [router.pathname]);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  useEffect(() => {
    data?.[0] &&
      !isEmpty &&
      setProducts(products.concat(...data[data.length - 1]));
  }, [data]);
  useEffect(() => {
    setLoading(true);
    window.dispatchEvent(new Event("storage"));
    setProducts(initialData);
    getAllCategory();
    setLoading(false);
  }, []);
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
      <GlobalLayout />
      <div className=" px-10 bg-main h-full flex flex-col">
        <div className="flex flex-row py-12 w-full justify-between ">
          <Category
            positionSticky={false}
            parent={parent}
            main={main}
            child={child}
            selectedCategoryType={type}
            selectedCategoryId={catId}
            padding="1rem"
          />

          <div
            className="flex flex-row "
            style={{ width: "70%", gap: "30px", flexWrap: "wrap" }}
            id={"content"}
          >
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row items-center">
                <Breadcrumbs mt="xs">
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
                </Breadcrumbs>
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
                />
              </div>
            </div>
            <ProductGridList
              showSkeleton={isLoading || isValidating}
              isEmpty={isEmpty}
              emptyStateMessage="ангиллын бараа олдсонгүй"
              query={
                type === "main"
                  ? main.find((e) => e.id === catId)?.name
                  : type === "parent"
                  ? parent.find((e) => e.id === catId)?.name
                  : type === "child"
                  ? parent.find((e) => e.id === catId)?.name
                  : ""
              }
              cols={4}
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
        </div>
      </div>
      <BottomFooter />
    </div>
  );
};

export default CategoryPage;
