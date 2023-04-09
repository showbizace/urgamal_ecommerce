import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import ProductTypeChip from "../../components/ProductTypeChip/ProductTypeChip";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Magnifier from "../../components/Magnifier/Magnifier";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProductCardExample from "../../components/ProductCardExample";
import { LoadingOverlay, Button, Badge, Divider, Loader } from "@mantine/core";
import { Store } from "@/utils/Store";
import { getCookie } from "cookies-next";
import { SuccessNotification } from "../../utils/SuccessNotification";
import { IconHeart } from "@tabler/icons-react";
import BottomFooter from "@/components/Footer";
import Category from "@/components/category";
import axios from "axios";
import { SwiperSlide, Swiper } from "swiper/react";
import ProductCardSwiper from "@/components/product-card-swiper";
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/single?productid=${params.id}`
  );
  const data = await res.json();
  return {
    props: {
      product: data.data,
    },
  };
}

const ProductDetail = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const [main, setMain] = useState();
  const [parent, setParent] = useState();
  const [child, setChild] = useState();
  const addToCartHandler = async () => {
    setLoading(true);
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1, purchaseCount: 1 },
    });
    const token = getCookie("token");
    console.log(token, "token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        item_id: product.id,
        qty: 1,
        businessId: "local_test",
      }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/add/local`,
      requestOption
    );
    SuccessNotification({
      message: "Сагсанд амжилттай орлоо!",
      title: `${product?.name}`,
    });
    setLoading(false);
  };

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
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <GlobalLayout title={product?.name}>
      <div className="flex flex-col w-full min-h-screen xl:px-10 lg:px-20 md:px-16 sm:px-11 py-12  items-start ">
        <div className="flex  w-full gap-20 justify-start">
          <Category
            positionSticky={false}
            parent={parent}
            main={main}
            child={child}
          />

          <div className="flex gap-14  justify-center xl:flex-row lg:flex-row md:flex-row  sm:flex-col xs:flex-col xs2:flex-col">
            {/* <Magnifier
              imgSrc={
                
              }
              imgWidth={515}
              imgHeight={515}
              magnifierRadius={50}
            /> */}
            <div className="relative  md:w-[33vw] md:h-[33vw] sm:w-[66vw] sm:h-[66vw] xs:w-[66vw] xs:h-[66vw]  xs2:w-[66vw] xs2:h-[66vw] bg-gray-100 border-2 rounded-md">
              <Image
                src={
                  product?.product_image !== null
                    ? `${product?.product_image.images[0]}`
                    : "/bundle-1.svg"
                }
                loader={() =>
                  product?.product_image !== null
                    ? `${product?.product_image.images[0]}`
                    : "/bundle-1.svg"
                }
                fill
                // sizes="(max-width: 768px) 20vw,
                // (max-width: 1200px) 20vw,
                // (max-width: 1200px) 20vw,
                // 20vw"
                className="object-contain rounded-md"
              />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-6">
                <div className=" text-2xl font-semibold">{product?.name}</div>
                <div className="flex font-semibold gap-2">
                  <span className="text-greenish-grey  ">Ширхэгийн үнэ:</span>
                  <span className=" ">
                    {Intl.NumberFormat("mn-MN").format(product?.price)}₮
                  </span>
                </div>
                <div className="flex font-semibold gap-2">
                  <span className="text-greenish-grey  ">Бөөний үнэ:</span>
                  <span className="text-greenish-grey line-through ">
                    {" "}
                    {Intl.NumberFormat("mn-MN").format(product.price)}₮
                  </span>
                  <span className="text-greenish-grey  "> / </span>
                  <span>
                    {" "}
                    {Intl.NumberFormat("mn-MN").format(product.promo_price)}₮
                  </span>
                </div>
                <div className="flex font-semibold  gap-2 items-center">
                  <span className="text-greenish-grey  ">Үлдэгдэл:</span>
                  {product.instock > 10 ? (
                    <Badge color="teal">Хангалттай</Badge>
                  ) : product.instock == 0 ? (
                    <Badge color="yellow">Үлдэгдэлгүй</Badge>
                  ) : (
                    <span className="text-greenish-grey  ">
                      {product.instock} {product.unit}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 font-semibold">
                  <span className="text-greenish-grey  ">Төрөл:</span>
                  {product.CategoryName && (
                    <ProductTypeChip name={product.CategoryName} />
                  )}
                </div>
                {product.instruction ? (
                  <div className="flex flex-col gap-4">
                    <span className="flex font-semibold text-greenish-grey">
                      Хэрэглэх заавар
                    </span>
                    <textarea
                      cols={60}
                      rows={12}
                      readOnly
                      className=" overflow-x-hidden overflow-y-hidden focus: outline-0 py-3 px-3 rounded-md"
                      value={product.instruction}
                    ></textarea>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="flex gap-6 w-full mt-5">
                <Button
                  variant={"outline"}
                  rightIcon={<IconHeart size={20} stroke={2} />}
                  size="md"
                  styles={{
                    label: { fontWeight: 500 },
                  }}
                  color={"red"}
                  className="flex-grow flex justify-between items-center px-5 py-3 rounded-md"
                >
                  Хадгалах
                </Button>
                <Button
                  variant={"filled"}
                  size="md"
                  color={"orange"}
                  className="flex-grow flex justify-between items-center px-5 py-3 rounded-md"
                  disabled={loading}
                  rightIcon={
                    loading ? (
                      <Loader size="xs" color="yellow" />
                    ) : (
                      <AiOutlineShoppingCart
                        className="font-semibold"
                        size={20}
                      />
                    )
                  }
                  onClick={addToCartHandler}
                >
                  Сагсанд хийх
                </Button>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10" />
        <div className="w-full flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <p className="ml-2 text-lg font-semibold">
              Санал болгож буй бүтээгдэхүүнүүд
            </p>
            <div className="flex flex-row">
              <div className="flex justify-center items-center rounded-full bg-white w-7 ">
                <Image src="/icons/arrow-left.svg" width={10} height={22} />
              </div>
              <div className="flex justify-center items-center rounded-full w-7 ml-2 bg-background-sort pl-1 ">
                <Image src="/icons/arrow-right.svg" width={10} height={22} />
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%", gap: "20px", flexWrap: "wrap" }}
            className="flex flex-row mt-12"
          >
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              auto
              pagination={{
                clickable: true,
              }}
            >
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <BottomFooter />
    </GlobalLayout>
  );
};

export default ProductDetail;
