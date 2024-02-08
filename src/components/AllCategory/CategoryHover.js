import React, { useEffect, useState } from "react";
import AllCategory from "./AllCategory";
import { fetchMethod, getCategory } from "@/utils/fetch";
import { IoIosArrowForward } from "react-icons/io";
import { Loader, rem } from "@mantine/core";
import CategoryHoverItem from "./CategoryHoverItem";
import CategoryHoverResult from "./CategoryHoverResult";
import Image from "next/image";
import { showNotification } from "@mantine/notifications";
import { IconCircleXFilled } from "@tabler/icons-react";
const CategoryHover = ({ setIsHovered, loading, categories }) => {
  const [filterData, setFilterData] = useState([]);

  const handleEnter = (item) => {
    setIsHovered(true);
    setFilterData(item);
  };

  return (
    <div
      className="flex flex-row bg-white absolute left-0 top-14 rounded-md py-2 px-4 w-full h-[32rem] overflow-auto"
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row relative w-full">
        {loading ? (
          <div className="w-full justify-center items-center flex h-96">
            <Loader color="yellow" />
          </div>
        ) : (
          <div className="flex flex-row w-full h-full ">
            <div className="flex flex-col">
              {categories?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-2 items-center w-80"
                  onMouseEnter={() => handleEnter(item, index)}
                >
                  {item.icon && (
                    <Image src={item.icon} width={24} height={24} alt="icon" />
                  )}
                  <CategoryHoverItem item={item} index={index} />
                </div>
              ))}
            </div>
            <div className="w-full relative h-full  ">
              <CategoryHoverResult item={filterData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryHover;
