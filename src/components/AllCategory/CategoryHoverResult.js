import { IconMacroOff } from "@tabler/icons-react";
import React, { useState } from "react";
import CategoryHoverInner from "./CategoryHoverInner";
import { IoIosArrowForward } from "react-icons/io";
import { rem } from "@mantine/core";

const CategoryHoverResult = ({ item, index }) => {
  const [filterData, setFilterData] = useState([]);
  const handleEnter = (item) => {
    setFilterData(item);
  };

  return (
    <>
      {item?.child_cats?.length > 0 ? (
        <div className="flex flex-row w-full  h-[31rem] fixed">
          <div className="flex flex-col flex-wrap items-start px-8" key={index}>
            <span className="mt-1 mb-3 text-grey600 text-base">Ангилал</span>
            {item?.child_cats?.map((item, index) => (
              <button
                key={index}
                className="py-2 text-sm hover:text-primary text-grey600 font-semibold flex flex-row justify-between w-96"
                onMouseEnter={() => {
                  handleEnter(item);
                }}
              >
                {item?.name}
                <IoIosArrowForward size={rem(16)} />
              </button>
            ))}
          </div>
          <CategoryHoverInner item={filterData} />
        </div>
      ) : (
        <div className="h-96 flex justify-center items-center flex-col font-semibold text-md-1 fixed w-[65rem]">
          <IconMacroOff color="#F9BC60" size={40} />
          Ангилал хоосон байна.
        </div>
      )}
    </>
  );
};

export default CategoryHoverResult;
