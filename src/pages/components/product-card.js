import Image from "next/image";

const ProductCard = ({ src, name, count, price }) => {
  return (
    <div className="flex flex-col justify-start items-center py-4 px-4">
      <Image src={src} width={10} height={10} className="product-card-img" />
      <div
        className="flex flex-col justify-start items-start"
        style={{ width: "90%" }}
      >
        <p className="text-sm">{name}</p>
        <div className="flex flex-row">
          <p className="text-[#696A6C] font-semibold text-xs">Үлдэгдэл :</p>
          <p className="text-xs font-semibold">{count}</p>
        </div>
        <p className="font-semibold text-base">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
