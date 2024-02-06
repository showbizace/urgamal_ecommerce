import Link from "next/link";

const NavBarLinks = ({ name }) => {
  return (
    <button
      className="px-3 flex justify-center items-center text-black hover:text-button-yellow font-normal hover:text-[#F9BC60] "
      style={{
        borderRight: "0.846197px solid rgba(0, 30, 29, 0.19)",
      }}
    >
      {name}
    </button>
  );
};

export default NavBarLinks;
