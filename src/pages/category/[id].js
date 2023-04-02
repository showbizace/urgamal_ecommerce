import Image from "next/image";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import { Collapse, Text, Grid } from "@nextui-org/react";
import Category from "@/components/category";
import ProductCard from "../../components/product-card";
import { Footer, Skeleton } from "@mantine/core";
import BottomFooter from "../../components/Footer";
import ProductCardExample from "../../components/ProductCardExample";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [main, setMain] = useState();
  const [parent, setParent] = useState();
  const [child, setChild] = useState();
  const [product, setProduct] = useState();
  const [isBottom, setIsBottom] = useState(false);
  const [positionSticky, setPositionSticky] = useState(false);
  const [loading, setLoading] = useState(false);

  const onScroll = useCallback((event) => {
    const wrappedElement = document.getElementById("content");
    if (isBottomhh(wrappedElement)) {
      setIsBottom(true);
      setOffset((prev) => prev + 1);
      window.removeEventListener("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll);
    }
    const { pageYOffset, scrollY, innerHeight } = window;
    const bottom = document.documentElement.scrollHeight;
    if (
      (pageYOffset >= 200 || scrollY >= 200) &&
      (pageYOffset < bottom - 100 || scrollY < bottom - 100)
    ) {
      setPositionSticky(true);
    } else {
      setPositionSticky(false);
    }
    if (innerHeight + Math.ceil(pageYOffset) >= document.body.offsetHeight) {
      setPositionSticky(false);
    }
  }, []);

  const clickProduct = (e) => {
    router.push({
      shallow: true,
      pathname: "/product/[id]",
      query: { id: e.id, data: e },
    });
  };

  useEffect(() => {
    setLoading(true);
    window.dispatchEvent(new Event("storage"));
    getLocalCat();
    getProduct();
    setLoading(false);
  }, []);

  const getLocalCat = () => {
    const data = JSON.parse(localStorage.getItem("main"));
    setMain(data);
    const data2 = JSON.parse(localStorage.getItem("parent"));
    setParent(data2);
    const data3 = JSON.parse(localStorage.getItem("child"));
    setChild(data3);
  };

  const getProduct = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        main_cat_id: id,
        limit: 20,
        offset: 0,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/local`,
      requestOption
    );
    if (res.status === 200) {
      setLoading(true);
      const data = await res.json();
      if (data.success === true) {
        setProduct(data.data);
        setLoading(false);
      }
    }
  };
  const getParentProduct = async (id, parent, val) => {
    console.log(parent, " parent");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        main_cat_id: id,
        parent_cat_id: parent,
        limit: 20,
        offset: 0,
      }),
    };
    if (val === true) {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/local`,
        requestOption
      );
      if (res.status === 200) {
        const data = await res.json();
        if (data.success === true) {
          setProduct(data.data);
          setLoading(false);
        }
      }
    }
  };
  const getChildProduct = async (id, parent, child) => {
    console.log(parent, " parent");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        main_cat_id: id,
        parent_cat_id: parent,
        child_cat_id: child,
        limit: 20,
        offset: 0,
      }),
    };

    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/local`,
      requestOption
    );
    if (res.status === 200) {
      const data = await res.json();
      if (data.success === true) {
        setProduct(data.data);
        setLoading(false);
      }
    }
  };
  const getMainProduct = async (id, val) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        main_cat_id: id,
        limit: 20,
        offset: 0,
      }),
    };
    if (val === true) {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/local`,
        requestOption
      );
      if (res.status === 200) {
        const data = await res.json();
        if (data.success === true) {
          setProduct(data.data);
          setLoading(false);
        }
      }
    }
  };

  const mainCategory = (ids) => {
    switch (ids) {
      case "1":
        return <p className="text-sm  text-grey">Өрхийн тариаланч</p>;
      case "2":
        return <p className="text-sm  text-grey">Мэргэжлийн тариаланч</p>;
      case "3":
        return <p className="text-sm  text-grey">Хэрэглэгч ангилал</p>;
    }
  };

  return (
    <div>
      <GlobalLayout />
      <div className=" px-10 bg-main py-12 h-full flex flex-col">
        <div className="flex flex-row ">
          <div>
            <Category
              positionSticky={positionSticky}
              parent={parent}
              main={main}
              child={child}
            />
          </div>
          <div className="flex flex-col ml-8 w-3/4">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row items-center">
                <p className="text-sm text-grey">Нүүр</p>
                <Image
                  width={18}
                  height={18}
                  src={"/icons/arrow-right-outline.svg"}
                />
                {mainCategory(id)}
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
            {loading === true ? (
              <div
                style={{
                  width: "100%",
                  gap: "20px",
                  flexWrap: "wrap",
                  height: "600px",
                }}
                className="flex flex-row mt-12"
              >
                <Skeleton style={{ width: "100%", height: "100%" }} />
              </div>
            ) : product !== undefined && product.length > 0 ? (
              <div
                style={{ width: "100%", gap: "20px", flexWrap: "wrap" }}
                className="flex flex-row mt-12"
              >
                {product !== undefined &&
                  product.map((e) => {
                    return (
                      <div
                        style={{ width: "22.3%" }}
                        onClick={() => clickProduct(e)}
                        className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
                      >
                        <ProductCard
                          src={
                            e.product_image !== null &&
                            e.product_image.images[0] !== null
                              ? `http://${e.product_image.images[0]}`
                              : "/bundle-1.svg"
                          }
                          data={e}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "600px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Таны бараа олдсонгүй.!
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomFooter />
    </div>
  );
};

export default CategoryPage;
