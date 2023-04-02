import { Collapse, Text, Grid, Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IconChevronRight } from "@tabler/icons-react";

const Category = ({ positionSticky, parent, main, child }) => {
  const router = useRouter();
  return (
    <div
      className={
        positionSticky === true
          ? "rounded-md bg-white sticky top-36"
          : "rounded-md bg-white"
      }
    >
      <Grid.Container
        style={{ borderRadius: "5px !important", boxShadow: "none" }}
      >
        <Grid style={{ width: "100%" }} gutter="xs">
          <Card.Header>
            <p className="font-semibold text-lg">Ангилал</p>
          </Card.Header>
          <Card.Divider align="center" />
          <Card.Body
            css={{ paddingTop: "0px", paddingBottom: "0px", overflow: "auto" }}
          >
            {main !== undefined &&
              main.map((e) => {
                return (
                  <Collapse
                    divider={false}
                    title={e.name}
                    style={{ width: "100%" }}
                    css={{ paddingTop: "0px" }}
                  >
                    {parent !== undefined &&
                      parent.map((el) => {
                        if (e.id === el.main_cat_id) {
                          return (
                            <div>
                              <Collapse.Group divider={false}>
                                <Collapse title={el.name}>
                                  <div className="max-h-64 overflow-auto scrollbar-hide">
                                    {child !== undefined &&
                                      child.map((item) => {
                                        if (
                                          e.id === item.main_cat_id &&
                                          el.id === item.parent_id
                                        ) {
                                          return (
                                            <div
                                              className="flex flex-row justify-between pt-3 px-3 cursor-pointer"
                                              onClick={() => {
                                                router.push({
                                                  shallow: true,
                                                  pathname: "/category/[id]",
                                                  query: { id: e.id },
                                                });
                                              }}
                                            >
                                              <Text>{item.name}</Text>
                                              <IconChevronRight
                                                color="#7E868C"
                                                stroke={1.5}
                                              />
                                            </div>
                                          );
                                        }
                                      })}
                                  </div>
                                </Collapse>
                              </Collapse.Group>
                            </div>
                          );
                        }
                      })}
                  </Collapse>
                );
              })}
          </Card.Body>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Category;
