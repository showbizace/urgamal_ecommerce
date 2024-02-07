import Link from "next/link";

const NavBarLinks = ({ name, linkUrl, onClick, isLast = false }) => {
  return (
    <div
      className="px-4 flex justify-center items-center"
      style={{
        borderRight: isLast ? "" : "0.846197px solid rgba(0, 30, 29, 0.19)",
      }}
    >
      <Link
        href={linkUrl}
        onClick={onClick}
        className="mx-4 text-center flex text-black"
      >
        {name}
      </Link>
    </div>
  );
};

export default NavBarLinks;
