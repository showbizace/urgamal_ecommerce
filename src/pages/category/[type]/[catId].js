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
import { Breadcrumbs } from "@mantine/core";
import { fetchMethod, fetcher, getCategory } from "@/utils/fetch";
import { PAGE_SIZE } from "@/utils/constant";

export async function getServerSideProps({ query }) {
  const { catId } = query;
  const data = await fetchMethod(
    "GET",
    `product?offset=0&limit=${PAGE_SIZE}&categoryId=${catId}`
  );
  return {
    props: {
      initialData: data.result,
    },
  };
}

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { type, catId } = router.query;
  const [parent, setParent] = useState([]);
  const [main, setMain] = useState([]);
  const [child, setChild] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCurrentCategoryPath = (parent, child) => {
    if (type === "parent") {
      const current = parent.find((e) => e.id == catId);
      if (current) {
        return [
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
      if (current) {
        const parentCat = parent.find((e) => e.id == current.parent_id);
        return [
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
    () => getCurrentCategoryPath(parent, child),
    [parent, child, router.asPath]
  );

  const { data, size, setSize, isValidating, isLoading } = useSWRInfinite(
    (index) => {
      return `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
        (index + 1) * 20
      }&limit=${PAGE_SIZE}&categoryId=${catId}`;
    },
    fetcher,
    { revalidateFirstPage: false }
  );

  useEffect(() => {
    setSize(0);
  }, [router.asPath]);

  const isEmpty = data?.[0]?.length === 0;

  useEffect(() => {
    setProducts([]);
    setSize(1);
  }, [size]);

  useEffect(() => {
    data?.length > 0 &&
      !isEmpty &&
      setProducts(products.concat(...data[data.length - 1]));
    // data?.length > 0 && !isEmpty && setProducts(products.concat(...data));
  }, [data]);

  useEffect(() => {
    setLoading(true);
    window.dispatchEvent(new Event("storage"));
    setProducts(initialData);
    fetchCategory();
    setLoading(false);
  }, []);

  const fetchCategory = async () => {
    const data = await getCategory();
    setMain(data);
    setLoading(false);
  };

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 350 >=
        document.documentElement.offsetHeight &&
      !isEmpty
    )
      setSize(size + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, [data]);

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

  const getAllCategory = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/product/cats`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setMain(response.data?.result);
        setLoading(false);
        // localStorage.setItem(
        //   "main",
        //   JSON.stringify(response.data.data.mainCats)
        // );
        // localStorage.setItem(
        //   "parent",
        //   JSON.stringify(response.data.data.parentCats)
        // );
        // localStorage.setItem(
        //   "child",
        //   JSON.stringify(response.data.data.childCats)
        // );
        // setParent(response.data.data.parentCats);
        // setChild(response.data.data.childCats);
      })
      .catch((error) => {
        if (error.response) {
        } else {
        }
      });
  };

  return (
    <GlobalLayout>
      <div>
        <div className="px-4 md:px-10 h-full">
          <div className="h-full flex flex-row py-6 md:py-12 justify-between gap-10">
            <div className="min-w-[250px] w-[250px] max-w-[250px] hidden lg:block">
              <Category
                parent={main}
                child={child}
                padding="1rem"
                loading={loading}
              />
            </div>
            <div
              className="flex flex-row w-full h-full"
              style={{ gap: "30px", flexWrap: "wrap" }}
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
                    alt="arrow-down"
                  />
                </div>
              </div>
              <ProductGridList
                showSkeleton={isLoading || isValidating}
                isEmpty={isEmpty}
                emptyStateMessage="ангиллын бараа олдсонгүй"
                query={
                  type === "parent"
                    ? parent.find((e) => e.id === catId)?.name
                    : type === "child"
                    ? parent.find((e) => e.id === catId)?.name
                    : ""
                    ? parent.find((e) => e.id === catId)?.name
                    : ""
                }
              >
                {products?.map((e, index) => (
                  <ProductCard
                    key={`product-card-key-${index}-${e?.id}`}
                    src={e?.product_image?.images?.[0]}
                    data={e}
                  />
                ))}
              </ProductGridList>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default CategoryPage;
