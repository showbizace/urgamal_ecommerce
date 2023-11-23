import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import MySkeleton from "../MySkeleton";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@tabler/icons-react";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ProductCard from "../product-card";
import { useRef, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
const PAGE_SIZE = 15;
const fetcher = (url) =>
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => { });
export default function ProductListWithCategory({
  categoryName,
  categoryIcon,
  categoryId,
  cols,
  className,
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL
    }/product/local?parent_cat_id=${categoryId}&offset=${0}&limit=${PAGE_SIZE}`,
    fetcher
  );
  return (
    <div className={`flex flex-col justify-center ${className}`}>
      <div className="flex gap-3 justify-between items-end">
        <div className="flex items-center gap-4 ml-2">
          <p
            className="
            text-md font-medium
		   md:text-xxl md:font-bold
		   sm:font-medium sm:text-base
		   xs:font-medium xs:text-xl"
          >
            {categoryName}
          </p>
          {categoryIcon && (
            <div
              className="relative
              h-8 w-8
              md:h-12 md:w-12
              sm:h-10 sm:w-10
              xs:h-8 xs:w-8"
            >
              <Image src={categoryIcon} fill alt={categoryIcon} />
            </div>
          )}
        </div>
        <Link
          href={`/category/parent/${categoryId}`}
          className="flex items-center gap-2 hover:underline text-greenish-grey"
        >
          <p
            className="
		   md:font-medium md:text-base
		   sm:font-normal sm:text-sm
		   xs:font-light xs:text-sm
		   "
          >
            Бүгдийг үзэх
          </p>
          <IconChevronRight size={"1.1rem"} />
        </Link>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          520: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1080: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="mySwiper mt-6"
      >
        {isLoading &&
          new Array(5)
            .fill(null)
            .map((e, index) => (
              <MySkeleton key={`product-skeleton-${index}`} />
            ))}
        {data &&
          data.map((e, index) => (
            <SwiperSlide className="rounded-md" key={index}>
              <ProductCard
                key={`product-card-key-${index}-${e.id}`}
                shouldScale={false}
                loader={() => e.product_image?.images?.[0]}
                src={e.product_image?.images?.[0]}
                alt={e?.name}
                data={e}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* <SimpleGrid
        cols={cols}
        spacing={20}
        verticalSpacing={20}
        className={`flex-grow mt-6`}
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {error && JSON.stringify(error)}
        {isLoading &&
          new Array(5)
            .fill(null)
            .map((e, index) => (
              <MySkeleton key={`product-skeleton-${index}`} />
            ))}
        {data &&
          data.map((e, index) => (
            <ProductCard
              key={`product-card-key-${index}-${e.id}`}
              src={e.product_image?.images?.[0]}
              data={e}
            />
          ))}
      </SimpleGrid> */}
    </div>
  );
}
