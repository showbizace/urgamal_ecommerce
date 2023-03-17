import Link from "next/link";

const NavBarLinks = ({ name, linkUrl, onClick }) => {
  return (
    <div
      className="px-4 flex justify-center items-center"
      style={{ borderRight: "0.846197px solid rgba(0, 30, 29, 0.19)" }}
    >
      <Link href={linkUrl} onClick={onClick} className="mx-4 text-center flex">
        {name}
      </Link>
    </div>
  );
};

export default NavBarLinks;
