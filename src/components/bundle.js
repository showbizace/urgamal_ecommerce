import Image from "next/image";
import Link from "next/link";

const Bundle = ({ src, name, count, price, productIndex }) => {
  return (
    <div
      className="py-4 flex flex-col justify-center items-center"
      style={{ height: "350px" }}
    >
      <Image
        loader={() => src}
        src={src}
        width={10}
        height={10}
        alt={name}
        className="bundle-img"
      />
      <p className="text-base mt-1">{name}</p>
      <div className="flex flex-row mt-1">
        <p className="text-sm text-grey">Үлдэгдэл : </p>
        <p className="text-sm">{count}</p>
      </div>
      <p className="font-semibold text-xl mt-1">{price}</p>
      <Link
        href={`product/${productIndex}`}
        className="flex flex-row justify-center items-center bg-green2 text-white py-1 px-4 rounded-md mt-2"
      >
        <p className="text-base">Дэлгэрэнгүй</p>
        <Image
          src={"/icons/arrow-left-2.svg"}
          width={16}
          height={11}
          className="ml-2"
        />
      </Link>
    </div>
  );
};

export default Bundle;
