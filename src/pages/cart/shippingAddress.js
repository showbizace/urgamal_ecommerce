import GlobalLayout from "@/pages/components/GlobalLayout/GlobalLayout";
import Link from "next/link";

const Address = () => {
  return (
    <>
      <GlobalLayout>
        <div className="bg-grey-back w-full h-full px-32 py-8">
          <div className="flex gap-2">
            <Link href="cartItem" shallow={true}>
              Сагс
            </Link>
            <Link
              href="shippingAddress"
              className="text-red-500"
              shallow={true}
            >
              Хаяг
            </Link>
            <Link href="checkout" shallow={true}>
              Төлбөр
            </Link>
          </div>
          <div className="w-3/5	">asd</div>
          <div className="w-3/5	">asd</div>
        </div>
      </GlobalLayout>
    </>
  );
};

export default Address;
