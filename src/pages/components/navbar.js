import Image from "next/image";
import NavBarLinks from "../components/nav-bar-links";
import Link from "next/link";
const Navbar = () => {
  return (
    <div
      className="bg-nav-background flex flex-row  justify-between  items-center py-2 px-32 "
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
    >
      <p className="flex flex-row justify-center items-center">
        ТАРИMАЛ{" "}
        <Image src="/logo.png" width={30} height={30} className="mx-4" />{" "}
        УРГАMАЛ
      </p>

      <div className="flex flex-row">
        <NavBarLinks
          name={"Цэцэгчин"}
          linkUrl={"hhhh"}
          onClick={() => print("Hello")}
        />
        <NavBarLinks
          name={"Ногоочин"}
          linkUrl={"hhhh"}
          onClick={() => print("Hello")}
        />
        <NavBarLinks
          name={"Үйлдвэр"}
          linkUrl={"hhhh"}
          onClick={() => print("Hello")}
        />
        <div className="px-4">
          <Link href={"hhhh"} onClick={() => {}} className="mx-4">
            Аж ахуйн нэгж
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="static flex flex-col items-center mr-4">
          <Image src="/icons/hearth.svg" width={23} height={23} />
          <div className="absolute">
            <div className="w-3 h-3 bg-number flex justify-center items-center text-white -mt-3 rounded-full text-xs ml-5">
              <p className="text-sm-5">1</p>
            </div>
          </div>
        </div>
        <div className="static flex flex-col items-center mr-4">
          <Image src="/icons/trolley.svg" width={23} height={23} />
          <div className="absolute">
            <div className="w-3 h-3 bg-number flex justify-center items-center text-white -mt-3 rounded-full text-xs ml-5">
              <p className="text-sm-5">1</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-6 items-end w-24">
          <p className="text-sm-1 self-end">Таны сагсанд</p>
          <p className="text-sm-1" style={{ fontSize: "16px" }}>
            15000₮
          </p>
        </div>
        <div className="flex justify-center items-center ml-10">
          <Image src="/user.png" width={50} height={50} className="" />
        </div>
        <div className="ml-4 flex flex-col items-start w-24">
          <p className="text-sm-1">Сайн байна уу?</p>
          <p className="text-base">О.Золбоо</p>
        </div>
        <Image src="icons/arrow-down.svg" width={30} height={30} />
      </div>
    </div>
  );
};

export default Navbar;
