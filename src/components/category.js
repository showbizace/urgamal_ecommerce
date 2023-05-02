import { Collapse, Text, Grid } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconChevronRight } from "@tabler/icons-react";
import { useContext } from "react";
import { UserConfigContext } from "@/utils/userConfigContext";

const Category = ({
  parent,
  child,
  padding,
  selectedCategoryType,
  selectedCategoryId,
}) => {
  const router = useRouter();
  const userConfigs = useContext(UserConfigContext);
  return (
    <div
      id="category-menu"
      className={
        "rounded-md bg-white overflow-y-auto max-h-screen xl:block lg:block md:block sm:hidden xs2:hidden xs:hidden min-w-[250px] w-[250px] max-w-[250px] z-10"
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
      >
        <div className="h-full">
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-medium">Бүх ангилал</p>
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
                          <p className="hover:text-[#fd7e14] font-semibold">
                            {el.name}
                          </p>,
                        ]}
                        expanded={() => {
                          if (
                            selectedCategoryType &&
                            selectedCategoryType === "parent"
                          ) {
                            return el.id === selectedCategoryId;
                          } else if (
                            selectedCategoryType &&
                            selectedCategoryType === "child"
                          ) {
                            const found = child.find(
                              (e) => e.id == selectedCategoryId
                            );
                            if (found && found.parent_id === el.id) {
                              return true;
                            }
                            return false;
                          } else {
                            return false;
                          }
                        }}
                      >
                        <div className="overflow-auto scrollbar-hide">
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
        </div>
      </Grid.Container>
    </div>
  );
};

export default Category;
