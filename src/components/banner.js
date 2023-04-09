import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        className="mySwiper"
        observer={true}
        observeParents={true}
        parallax={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <Image
            src="/banner.png"
            width={1000}
            height={1000}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded"
          />
          <p
            // style={{
            //   position: "absolute",
            //   color: "white",
            //   top: "15rem",
            //   left: "7rem",
            //   fontSize: "2rem",
            //   width: "40rem",
            //   fontWeight: "bold",
            //   textAlign: "start",
            // }}
            className="absolute text-white top-[8rem] left-[4rem] font-medium text-[2rem] w-[40rem] font-bold text-start              "
          >
            Тэжээл, нөхөн сэргээлт, зүлгэнд зориулсан үрийн худалдаа
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner.png"
            width={1000}
            height={1000}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded"
          />
          <p
            // style={{
            //   position: "absolute",
            //   color: "white",
            //   top: "15rem",
            //   left: "7rem",
            //   fontSize: "2rem",
            //   width: "40rem",
            //   fontWeight: "bold",
            //   textAlign: "start",
            // }}
            className="absolute text-white top-[8rem] left-[4rem] font-medium text-[2rem] w-[40rem] font-bold text-start              "
          >
            Тэжээл, нөхөн сэргээлт, зүлгэнд зориулсан үрийн худалдаа
          </p>
        </SwiperSlide>
        {/* <SwiperSlide>Slide 2</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Banner;
