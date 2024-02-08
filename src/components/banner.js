import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Carousel } from "@mantine/carousel";

const Banner = () => {
  return (
    <div className="w-full">
      <div className="flex w-full h-[180px] lg:h-[32rem]">
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
    </div>
  );
};

export default Banner;
