import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Carousel } from "@mantine/carousel";
const Banner = () => {
  return (
    <div className="w-full">
      <Carousel
        withIndicators
        height={550}
        slideSize="100%"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        slideGap="md"
        loop
        align="start"
        slidesToScroll={1}
        draggable={false}
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
          <div className="relative w-full h-full">
            <Image
              src="/banner.png"
              fill
              className="rounded"
              style={{
                objectFit: "contain",
              }}
              draggable={false}
            />
            <p className="absolute text-white top-[8rem] left-[4rem] text-[2rem] w-[40rem] font-bold text-start              ">
              Тэжээл, нөхөн сэргээлт, зүлгэнд зориулсан үрийн худалдаа
            </p>
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default Banner;
