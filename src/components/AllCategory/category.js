import { Collapse, Text, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IconChevronRight } from "@tabler/icons-react";
import MySkeleton from "../MySkeleton";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";

const Category = ({ padding }) => {
  const router = useRouter();
  const { catId } = router.query;
  const categories = useCategories();
  return (
    <div
      id="category-menu"
      className={
        "rounded-md bg-white overflow-y-auto max-h-screen xl:block lg:block md:block sm:hidden xs2:hidden xs:hidden z-10 min-w-[350px] w-[350px] max-w-[350px]"
      }
    >
      <Grid.Container
        style={{
          borderRadius: "5px !important",
          boxShadow: "none",
          padding: "1rem",
          padding: padding ? padding : "0px",
          height: "100%",
        }}
        key={"grid-container"}
      >
        <div className="h-full">
          <div className="flex flex-row justify-between w-full">
            <p className="text-xl font-semibold">Бүх ангилал</p>
          </div>
          <Grid
            style={{
              width: "100%",
              height: "100%",
              marginTop: 20,
              overflowY: "auto",
            }}
            grow
            gutter="xs"
          >
            <Collapse.Group
              divider={false}
              accordion={false}
              css={{
                marginTop: "0px",
                paddingTop: 0,
                paddingBottom: "0.6rem",
                paddingRight: 0,
                paddingLeft: 0,
                height: "100%",
              }}
            >
              {categories &&
                categories?.categories?.map((el, index) => {
                  return (
                    <Collapse
                      key={el?.id}
                      id={el?.id}
                      css={{
                        paddingLeft: "$5",
                        paddingRight: "$5",
                        borderRadius: "$lg",
                      }}
                      tabIndex={2}
                      arrowIcon={[
                        <IconChevronRight color="#fcbc60" key={index} />,
                      ]}
                      title={[
                        <div className="flex flex-row gap-2" key={index}>
                          {el?.icon && (
                            <Image
                              alt="category-icon"
                              src={el.icon}
                              width={24}
                              height={24}
                            />
                          )}
                          <p
                            className={`hover:text-[#fd7e14] ${
                              catId === el.id && "font-semibold"
                            }`}
                            key={index}
                          >
                            {el.name}
                          </p>
                        </div>,
                      ]}
                      onClick={() => {
                        router.push({
                          pathname: `/category/${el.id}`,
                        });
                      }}
                      expanded={() => {
                        if (catId) {
                          if (catId === el.id) {
                            return true;
                          } else {
                            return false;
                          }
                        } else {
                          return false;
                        }
                      }}
                    >
                      {el?.child_cats &&
                        el?.child_cats.map((el, index) => (
                          <Collapse
                            key={el?.id}
                            id={el?.id}
                            css={{
                              paddingLeft: "$5",
                              paddingRight: "$5",
                              borderRadius: "$lg",
                            }}
                            tabIndex={2}
                            arrowIcon={[
                              <IconChevronRight color="#fcbc60" key={index} />,
                            ]}
                            title={[
                              <p className="hover:text-[#fd7e14]" key={index}>
                                {el?.name}
                              </p>,
                            ]}
                          >
                            <div className="overflow-auto scrollbar-hide">
                              {/* {child !== undefined &&
                                child.map((item, index) => {
                                  if (el.id === item.parent_id) {
                                    return (
                                      <Text
                                        key={index}
                                        className="w-full p-4 cursor-pointer hover:font-medium hover:underline"
                                        onClick={() => {
                                          router.push({
                                            pathname: `/category/child/${item.id}`,
                                          });
                                        }}
                                      >
                                        {item.name}
                                      </Text>
                                    );
                                  }
                                })} */}
                            </div>
                          </Collapse>
                        ))}
                      {/* <div className="overflow-auto scrollbar-hide">
                          {child !== undefined &&
                            child.map((item, index) => {
                              if (el.id === item.parent_id) {
                                return (
                                  <Text
                                    key={index}
                                    className="w-full p-4 cursor-pointer hover:font-medium hover:underline"
                                    onClick={() => {
                                      router.push({
                                        pathname: `/category/child/${item.id}`,
                                      });
                                    }}
                                  >
                                    {item.name}
                                  </Text>
                                );
                              }
                            })}
                        </div> */}
                    </Collapse>
                  );
                })}
              {/* {parent !== undefined &&
                  parent
                    .filter(
                      (e) =>
                        e.main_cat_id.toString() === userConfigs.preferenceConfig
                    )
                    .map((el, index) => {
                      return (
                        <Collapse
                          key={index}
                          id="2"
                          css={{
                            paddingLeft: "$5",
                            paddingRight: "$5",
                            borderRadius: "$lg",
                          }}
                          tabIndex={2}
                          arrowIcon={[
                            <IconChevronRight color="#fcbc60" key={index} />,
                          ]}
                          title={[
                            <p
                              className="hover:text-[#fd7e14] font-semibold"
                              key={index}
                            >
                              {el.name}
                            </p>,
                          ]}
                          expanded={() => {
                            if (
                              selectedCategoryType &&
                              selectedCategoryType === "parent"
                            ) {
                              return el.id === selectedCategoryId;
                            }
                             else if (
                              selectedCategoryType &&
                              selectedCategoryType === "child"
                            )
                            {
                              const found = child.find(
                                (e) => e.id == selectedCategoryId
                              );
                              if (found && found.parent_id === el.id) {
                                return true;
                              }
                              return false;
                            }
                            else {
                              return false;
                            }
                          }}
                        >
                          <div className="overflow-auto scrollbar-hide">
                            {child !== undefined &&
                              child.map((item, index) => {
                                if (el.id === item.parent_id) {
                                  return (
                                    <Text
                                      key={index}
                                      className="w-full p-4 cursor-pointer hover:font-medium hover:underline"
                                      onClick={() => {
                                        router.push({
                                          pathname: `/category/child/${item.id}`,
                                        });
                                      }}
                                    >
                                      {item.name}
                                    </Text>
                                  );
                                }
                              })}
                          </div>
                        </Collapse>
                      );
                    })} */}
            </Collapse.Group>
          </Grid>
        </div>
      </Grid.Container>
    </div>
  );
};

export default Category;
