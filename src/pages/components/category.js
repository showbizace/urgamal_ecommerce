import { Collapse, Text, Grid } from "@nextui-org/react";
import Image from "next/image";
const Category = () => {
  return (
    <div className="w-2/6 rounded-md bg-white">
      <Grid.Container
        style={{ borderRadius: "5px !important", boxShadow: "none" }}
      >
        <div
          className="flex flex-row justify-between px-4 py-4 w-full mx-4"
          style={{ borderBottom: "1px solid rgba(132, 132, 132, 0.18)" }}
        >
          <p>Ангилал</p>
          <Image
            src={"/icons/plant.svg"}
            width={25}
            height={25}
            color={"#8DC57F"}
          />
        </div>
        <Grid style={{ padding: "0px" }}>
          <Collapse.Group divider={false}>
            <Collapse title="Бордоо">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
            <Collapse title="Үр">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
            <Collapse title="Ургамал хамгаалал">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
            <Collapse title="Хөрс">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
            <Collapse title="Багаж хэрэгсэл">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Category;
