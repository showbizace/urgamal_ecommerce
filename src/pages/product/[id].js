import Image from "next/image";
import React from "react";
import GlobalLayout from "../components/GlobalLayout/GlobalLayout";

export default function ProductDetail() {
  return (
    <GlobalLayout>
      <div className="px-32">
        <div className="flex gap-14 mt-12">
          {/* <Image src="https://m.media-amazon.com/images/I/71MzNrCPYsL.jpg" width={50} height={50} /> */}
          <Image src="/bundle-1.svg" width={315} height={380} />
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
            <div className="flex">
              <span>Төрөл:</span>
              <ProductTypeChip name="Бордоо" />
              <ProductTypeChip name="Үр" />
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
