import { Accordion, Skeleton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

function AllCategory({ type = "default", categories, isLoading }) {
  return type === "drawer" ? (
    <div className="h-full">
      <ul role="list" className="relative flex flex-col gap-2 h-full mt-6 ">
        <Accordion variant="filled">
          {isLoading &&
            new Array(6)
              .fill(null)
              .map((e, i) => <Skeleton key={i.toString()} height={36} />)}

          {categories &&
            categories.map((parent) => {
              return (
                <Accordion.Item
                  value={parent?.name + parent?.id}
                  key={parent?.id}
                >
                  <Accordion.Control>
                    <li
                      key={parent?.name + parent?.id}
                      className="group/parent  py-2 flex justify-between items-center  "
                    >
                      <Link
                        href={`/category/parent/${parent?.Id}`}
                        className="text-2xl group-hover/parent:underline "
                      >
                        {" "}
                        {parent?.name?.charAt(0).toUpperCase() +
                          parent?.name?.slice(1)}
                      </Link>
                    </li>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <div className="z-50 bg-white rounded-sm  cursor-default">
                      <ul
                        role="listitem"
                        className=" gap-2 flex flex-col px-3 py-2 rounded-sm"
                      >
                        {parent?.child_categories?.map((child, index) => (
                          <div key={`chunk-${index}`}>
                            <li
                              key={child?.name + child?.id}
                              className="group/item w-full hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
                            >
                              <Link
                                href={`/category/child/${child?.id} `}
                                className="text-sm group-hover/item:underline"
                              >
                                {child?.name?.charAt(0).toUpperCase() +
                                  child?.name?.slice(1)}
                              </Link>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
        </Accordion>
      </ul>
    </div>
  ) : (
    <div className="h-full ">
      <ul role="list" className="relative flex flex-col gap-2 h-full">
        {isLoading &&
          new Array(6)
            .fill(null)
            .map((e, i) => <Skeleton key={i.toString()} height={36} />)}
        {categories &&
          categories?.map((parent) => {
            return (
              <li
                key={parent?.name + parent?.id}
                className="group/parent  hover:bg-gray-100 px-6 py-2 flex justify-between items-center cursor-pointer"
              >
                <Link
                  href={`/category/parent/${parent?.Id}`}
                  className="text-sm group-hover/parent:font-medium"
                >
                  {" "}
                  {parent?.name?.charAt(0)?.toUpperCase() +
                    parent?.name?.slice(1)}
                </Link>
                <IconChevronRight size={"1rem"} />
                <div className="absolute top-0 left-full hidden group-hover/parent:block z-50 bg-white rounded-sm border-2 cursor-default">
                  <ul
                    role="listitem"
                    className=" gap-2  flex px-3 py-2 rounded-sm"
                  >
                    {/* {parent?.child_categories
                      ?.reduce((resultArray, item, index) => {
                        const chunkIndex = Math.floor(index / perChunk);
                        if (!resultArray[chunkIndex]) {
                          resultArray[chunkIndex] = []; // start a new chunk
                        }
                        resultArray[chunkIndex].push(item);
                        return resultArray;
                      }, [])
                      .map((chunk, index) => (
                        <div key={`chunk-${index}`}>
                          {chunk.map((child) => ( */}
                    <li
                      key={parent?.name + parent?.id}
                      className="group/item w-60 hover:bg-gray-100 px-4 py-2 flex justify-between items-center rounded-md cursor-pointer"
                    >
                      <Link
                        href={`/category/child/${parent?.Id} `}
                        className="text-sm group-hover/item:underline"
                      >
                        {parent?.name?.charAt(0)?.toUpperCase() +
                          parent?.name?.slice(1)}
                      </Link>
                    </li>
                    {/* ))}
                        </div>
                      ))} */}
                  </ul>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default AllCategory;
