import Image from "next/image";
import "swiper/css";
import { useState } from "react";
import "swiper/css/navigation";
import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import Category from "./AllCategory/category";
import CategoryHover from "./AllCategory/CategoryHover";
import useCategories from "@/hooks/useCategories";
import { IconChevronRight } from "@tabler/icons-react";

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const categories = useCategories();

  return (
    <div className="flex mx-auto w-[90%] h-[180px] lg:h-[32rem]">
      <div className="py-2 px-8 bg-red-200 h-full scrollbar-hide overscroll-contain overflow-y-auto	">
        {categories &&
          categories?.categories?.map((item, idx) => {
            return (
              <div className="flex flex-row" key={idx}>
                <span>{item?.name}</span>
                <span>
                  <IconChevronRight size={rem(20)} />
                </span>
              </div>
            );
          })}
      </div>
      {isHovered && (
        <CategoryHover
          setIsHovered={setIsHovered}
          categories={categories}
          loading={loading}
        />
      )}
      <Carousel
        withIndicators
        height="100%"
        sx={{ flex: 1 }}
        slideSize="100%"
        breakpoints={[
          { maxWidth: "md", slideSize: "100%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        slideGap="md"
        loop
        align="center"
        slidesToScroll={1}
        draggable={true}
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
        }}
      >
        <Carousel.Slide>
          <div className="relative w-full h-full rounded-lg">
            <Image
              alt="banner2"
              src="/banner2.png"
              fill
              className="rounded object-fill md:object-cover  max-h-full"
              draggable={false}
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="relative w-full h-full rounded-lg">
            <Image
              alt="banner"
              src="/banner.png"
              fill
              className="rounded object-fill md:object-cover  max-h-full"
              draggable={false}
            />
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default Banner;
