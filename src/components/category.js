import { Collapse, Text, Grid } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconChevronRight } from "@tabler/icons-react";
import { useContext } from "react";
import { UserConfigContext } from "@/utils/userConfigContext";

const Category = ({ positionSticky, parent, child, padding }) => {
  const router = useRouter();
  const userConfigs = useContext(UserConfigContext);
  return (
    <div
      id="category-menu"
      className={
        positionSticky === true
          ? "rounded-md bg-white  top-36 h-[60vh] xl:block lg:block md:block sm:hidden xs2:hidden xs:hidden max-w-sm"
          : "rounded-md bg-white h-screen  xl:block lg:block md:block sm:hidden xs2:hidden xs:hidden max-w-sm "
      }
      // fixed top-40 w-80
    >
      <Grid.Container
        style={{
          borderRadius: "5px !important",
          boxShadow: "none",
          padding: "1rem",
          padding: padding ? padding : "0px",
        }}
      >
        <div className="flex flex-row justify-between w-full">
          <p className="text-lg font-medium">Ангиллууд</p>
        </div>
        <Grid style={{ width: "100%" }} grow gutter="xs">
          <Collapse.Group
            divider={false}
            accordion={false}
            css={{
              marginTop: "0px",
              paddingTop: "1rem",
              paddingBottom: "0.6rem",
              paddingRight: 0,
              paddingLeft: 0,
            }}
          >
            {parent !== undefined &&
              parent
                .filter(
                  (e) =>
                    e.main_cat_id.toString() === userConfigs.preferenceConfig
                )
                .map((el) => {
                  return (
                    <Collapse
                      id="2"
                      css={{
                        paddingLeft: "$5",
                        paddingRight: "$5",
                        borderRadius: "$lg",
                      }}
                      tabIndex={2}
                      arrowIcon={[<IconChevronRight color="#fcbc60" />]}
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
                      //   (selectedCategoryType === "child" ||
                      //     selectedCategoryType === "parent") &&
                      //   child.find(
                      //     (childCat) => childCat.parent_id == selectedCategoryId
                      //   )
                      // }
                    >
                      <div className="max-h-96 overflow-auto scrollbar-hide">
                        {child !== undefined &&
                          child.map((item) => {
                            if (el.id === item.parent_id) {
                              return (
                                <Text
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
                })}
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Category;
