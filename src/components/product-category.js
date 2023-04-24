import Image from "next/image";
const ProductCategory = ({ src, text, width, height }) => {
  return (
    <div
      className="flex flex-col justify-center items-center py-4 px-2"
      style={{ height: "200px" }}
    >
      <Image
        loader={() => src}
        src={src}
        alt={text}
        width={width}
        height={height}
        className="category-img"
      />
      <p className="mt-4 text-sm font-semibold">{text}</p>
    </div>
  );
};

export default ProductCategory;
