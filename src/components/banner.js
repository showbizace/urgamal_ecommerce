import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
const Banner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "35rem",
      }}
    >
      <Swiper
        className="mySwiper"
        observer={true}
        observeParents={true}
        parallax={true}
        // navigation={true}
      >
        <SwiperSlide>
          <div style={{ width: "100%", height: "100%" }}>
            <Image
              src="/banner.png"
              width={2000}
              height={2000}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <p
              style={{
                position: "absolute",
                color: "white",
                top: "15rem",
                left: "7rem",
                fontSize: "2rem",
                width: "40rem",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              Тэжээл, нөхөн сэргээлт, зүлгэнд зориулсан үрийн худалдаа
            </p>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>Slide 2</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Banner;
