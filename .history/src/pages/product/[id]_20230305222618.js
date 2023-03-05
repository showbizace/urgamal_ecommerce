import Image from "next/image";
import React from "react";
import GlobalLayout from "../components/GlobalLayout/GlobalLayout";
import ProductTypeChip from "../components/ProductTypeChip/ProductTypeChip";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactImageMagnify from "react-image-magnify";
import Magnifier from "../components/Magnifier/Magnifier";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
export default function ProductDetail() {
  return (
    <GlobalLayout>
      <div className="px-32">
        <div className="flex gap-14 pt-12 justify-center">
          {/* <Image src="https://m.media-amazon.com/images/I/71MzNrCPYsL.jpg" width={50} height={50} /> */}
          {/* <Image src="/bundle-1.svg" width={315} height={380} /> */}
          {/* <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                height: 380,
                width: 315,
                src: "https://picsum.photos/id/1019/1000/600/",
              },
              largeImage: {
                src: "https://picsum.photos/id/1019/1000/600/",
                width: 1200,
                height: 1800,
              },
              enlargedImagePosition: "over",
              enlargedImageContainerDimensions: {
                width: "100%",
                height: "100%",
              },
            }}
          /> */}
          {/* <Magnifier imgSrc="https://picsum.photos/id/1019/1000/600/" imgWidth={600} imgHeight={600} magnifierRadius={150} /> */}
          <Carousel
            infiniteLoop={true}
            autoPlay
            interval={3000}
            showThumbs={true}
            showArrows={false}
            showStatus={true}
            showIndicators={false}
            swipeable={true}
            renderThumbs={() =>
              images.map((img, idx) => (
                <div key={idx} className="w-full h-20 relative">
                  <Image src={img.thumbnail} fill alt="logo"></Image>
                </div>
              ))
            }
          >
            {images.map((e) => (
              <div>
                {/* <Magnifier imgSrc={e.original} imgWidth={600} imgHeight={600} magnifierRadius={50} /> */}
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: e.original,
                    },
                    largeImage: {
                      src: e.original,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImagePosition: "over",
                  }}
                />
              </div>
            ))}
          </Carousel>
          <div className="flex flex-col gap-6">
            <div className=" text-lg "> WILDFLOWER SEED MIX 800г</div>
            <div className="flex">
              <span>Ширхэгийн үнэ:</span>
              <span> 15’000₮</span>
            </div>
            <div className="flex">
              <span>Бөөний үнэ:</span>
              <span> 15’000₮</span>
              <span> 15’000₮</span>
            </div>
            <div className="flex">
              <span>Үлдэгдэл:</span>
              <span> 150 Ш</span>
            </div>
            <div className="flex gap-2">
              <span>Төрөл:</span>
              <ProductTypeChip name="Бордоо" />
              <ProductTypeChip name="Үр" />
            </div>
            <div className="flex">Хэрэглэх заавар:</div>
            <div className="flex">
              <textarea
                cols={60}
                rows={12}
                readOnly
                className=" overflow-x-hidden overflow-y-hidden focus: outline-0 bg-"
                value="Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар,Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх
                заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар , Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар,
                Хэрэглэх заавар, Хэрэглэх"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
