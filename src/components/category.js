import { Collapse, Text, Grid } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Category = ({ positionSticky, parent, main, child }) => {
  const router = useRouter();
  return (
    <div
      className={
        positionSticky === true
          ? "rounded-md bg-white fixed top-36  max-w-[20vw] w-[20vw] xl:block lg:block md:block sm:hidden xs2:hidden xs:hidden"
          : "rounded-md bg-white   max-w-[20vw] w-[20vw] xl:block lg:block md:block sm:hidden xs2:hidden xs:hidden"
      }
      // fixed top-40 w-80
    >
      <Grid.Container
        style={{ borderRadius: "5px !important", boxShadow: "none" }}
      >
        <div
          className="flex flex-row justify-between py-4 px-4 w-full"
          style={{ borderBottom: "1px solid rgba(132, 132, 132, 0.18)" }}
        >
          <p className="font-semibold text-lg">Ангилал</p>
        </div>
        <Grid style={{ width: "100%" }} grow gutter="xs">
          <Collapse.Group
            divider={false}
            accordion={false}
            css={{
              marginTop: "0px",
              paddingTop: "0.6rem",
              paddingBottom: "0.6rem",
              paddingRight: "1rem",
              paddingLeft: "1rem",
            }}
          >
            {main !== undefined &&
              main.map((e) => {
                return (
                  <Collapse
                    title={[
                      <a
                        href={`/category/main/${e.id}`}
                        className="hover:text-[#fd7e14]"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/category/main/${e.id}`);
                        }}
                      >
                        {e.name}
                      </a>,
                    ]}
                    // expanded={
                    //   parent !== undefined &&
                    //   selectedCategoryType &&
                    //   ((selectedCategoryType === "parent" &&
                    //     main.find(
                    //       (mainCat) => mainCat.id == selectedCategoryId
                    //     )) ||
                    //     (selectedCategoryType === "child" &&
                    //       child.find(
                    //         (childCat) =>
                    //           childCat.main_cat_id == selectedCategoryId
                    //       )))
                    // }
                  >
                    {parent !== undefined &&
                      parent.map((el) => {
                        if (e.id === el.main_cat_id) {
                          return (
                            <Collapse.Group divider={false}>
                              <Collapse
                                title={[
                                  <a
                                    href={`/category/parent/${el.id}`}
                                    className="hover:text-[#fd7e14]"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      router.push(`/category/parent/${el.id}`);
                                    }}
                                  >
                                    {el.name}
                                  </a>,
                                ]}
                                // expanded={
                                //   selectedCategoryType &&
                                //   selectedCategoryType === "child" &&
                                //   child.find(
                                //     (childCat) =>
                                //       childCat.parent_id == selectedCategoryId
                                //   )
                                // }
                              >
                                <div className="max-h-96 overflow-auto scrollbar-hide">
                                  {child !== undefined &&
                                    child.map((item) => {
                                      if (
                                        e.id === item.main_cat_id &&
                                        el.id === item.parent_id
                                      ) {
                                        return (
                                          <Text
                                            className="w-full p-4 cursor-pointer hover:text-red"
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
                            </Collapse.Group>
                          );
                        }
                      })}
                  </Collapse>
                );
              })}
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Category;
