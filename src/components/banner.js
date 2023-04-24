import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Carousel } from "@mantine/carousel";
const Banner = () => {
  return (
    <div className="w-full ">
      <div className="flex w-full h-[180px] lg:h-[390px]">
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
                src="/banner2.png"
                fill
                className="rounded object-fill md:object-contain top-0 max-h-full"
                draggable={false}
              />
              {/* <p
              className="absolute text-white 
			  
		    md:top-[8rem] top-[50%] 
		    md:left-[4rem] left-[2rem] 
		    md:text-[2rem] text-xl
			md:w-[40rem] w-[20rem] font-bold text-center
			"
            >
              Тэжээл, нөхөн сэргээлт, зүлгэнд зориулсан үрийн худалдаа
            </p> */}
            </div>
          </Carousel.Slide>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
