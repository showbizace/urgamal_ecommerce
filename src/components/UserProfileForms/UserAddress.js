import {
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCirclePlus, IconPlus } from "@tabler/icons-react";
import ShippingAddressCard from "../ShippingAddressCard/ShippingAddressCard";
export default function UserAddress() {
  const form = useForm({
    initialValues: {
      givenName: "",
      familyName: "",
      mobile: "",
    },
  });
  return (
    <div className="flex flex-col   w-full ">
      <Title order={4}>Хүргэлтийн хаяг</Title>
      <Text size="xs" c="dimmed">
        Та хүргэлтийн хаягаа оруулж захиалгаа хялбар хийгээрэй
      </Text>
      <div className="mt-12">
        <div className="flex flex-col items-end gap-3">
          <Grid w={"100%"} align="center">
            <Grid.Col span={3}>
              <ShippingAddressCard name={"Гэр"} address={{}} />
            </Grid.Col>
            <Grid.Col span={3}>
              <ShippingAddressCard name={"Ажил"} address={{}} />
            </Grid.Col>

            <Paper
              withBorder
              radius="md"
              className="w-28 h-28 hover:bg-[#1970c221] "
            >
              <div className="w-28 h-28 cursor-pointer flex flex-col justify-center items-center gap-1 ">
                <IconPlus stroke={1.5} color="#228BE6" />
                <Text color="#228BE6" size="sm">
                  Нэмэх
                </Text>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    </div>
  );
}
