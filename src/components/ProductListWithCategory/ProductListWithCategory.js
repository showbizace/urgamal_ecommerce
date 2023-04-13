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
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

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
    .catch((error) => {
      console.log(error);
    });
export default function ProductListWithCategory({
  categoryName,
  categoryIcon,
  categoryId,
  cols,
  className,
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, isLoading, error } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/product/local?parent_cat_id=${categoryId}&offset=${0}&limit=${PAGE_SIZE}`,
    fetcher
  );
  return (
    <div className={`flex flex-col justify-center ${className}`}>
      <div className="flex gap-3 justify-between items-end">
        <div className="flex items-center gap-4 ml-2">
          <p className="text-xxl font-bold">{categoryName}</p>
          <div className="relative h-12 w-12">{categoryIcon}</div>
        </div>
        <Link
          href={`/category/parent/${categoryId}`}
          className="flex items-center gap-2 hover:underline text-greenish-grey"
        >
          <p className=" font-medium text-md ">Бүгдийг үзэх</p>
          <IconChevronRight size={"1.1rem"} />
        </Link>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation
        modules={[Navigation]}
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
            <SwiperSlide className="rounded-md">
              <ProductCard
                key={`product-card-key-${index}-${e.id}`}
                shouldScale={false}
                src={e.product_image?.images?.[0]}
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
