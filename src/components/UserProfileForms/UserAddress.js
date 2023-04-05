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
import { useDisclosure } from "@mantine/hooks";
import { DeleteConfirmationDialog } from "../Profile/deleteAddress";
import ProductModal from "../Profile/ProfileModal";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";
export default function UserAddress({ data, refresh }) {
  const cookie = getCookie("token");
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmationOpened, handlers] = useDisclosure(false);
  const [editingProdData, setEditingProdData] = useState();
  const [DeletingAddress, setDeletingAddress] = useState({ id: "" });

  const openProductEditingModal = (productData, type = "edit") => {
    if (type === "creation") {
      setEditingProdData({ create: true });
    } else {
      setEditingProdData(productData);
    }
    open();
  };
  const openDeleteConfirmation = (Id) => {
    setDeletingAddress({ id: Id });
    handlers.open();
  };
  const SubmitCreateShippingData = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const initialData = {
      name: values.name,
      city: values.city,
      province: values.province,
      district: values.district,
      committee: values.committee,
      street: values.street,
      fence: values.fence,
      apartment: values.apartment,
      number: values.number,
      phone: values.phone,
      type: values.type === undefined ? false : values.type,
      note: values.note,
    };

    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(initialData),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/address`,
      requestOption
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          showNotification({
            message: result.message,
            color: "green",
          });
          refresh();
          close;
        } else {
          showNotification({
            message: result.message,
            color: "red",
          });
        }
      });
  };
  const SubmitUpdateShippingData = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const initialData = {
      id: values.id,
      name: values.name,
      city: values.city,
      province: values.province,
      district: values.district,
      committee: values.committee,
      street: values.street,
      fence: values.fence,
      apartment: values.apartment,
      number: values.number,
      phone: values.phone,
      type: values.type ? values.type : false,
      note: values.note,
    };

    const requestOption = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(initialData),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/address`,
      requestOption
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          showNotification({
            message: result.message,
            color: "green",
          });
          refresh();
          close;
        } else {
          showNotification({
            message: result.message,
            color: "red",
          });
        }
      });
  };
  const SubmitDeleteShippingData = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOption = {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({ id: id }),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/address`,
      requestOption
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          showNotification({
            title: "Хаяг амжилттай устгалаа.",
            message: result.message,
            color: "green",
          });
          refresh();
        } else {
          showNotification({
            message: result.message,
            color: "red",
          });
        }
      });
    handlers.close();
  };

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
            {data?.map((e) => {
              return (
                <Grid.Col id={`user-address-card-${e.id}`} span={3}>
                  <ShippingAddressCard
                    name={e.name}
                    address={e}
                    onDelete={openDeleteConfirmation}
                    onUpdate={openProductEditingModal}
                  />
                </Grid.Col>
              );
            })}

            <Paper
              withBorder
              radius="md"
              className="w-28 h-28 hover:bg-[#1970c221] "
              component="button"
              onClick={(e) => {
                e.preventDefault();
                openProductEditingModal({}, "creation");
              }}
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
      <DeleteConfirmationDialog
        isOpen={confirmationOpened}
        close={handlers.close}
        confirmationText="Хаяг устгахад итгэлтэй байна уу?"
        thingToDelete={DeletingAddress}
        onConfirm={SubmitDeleteShippingData}
      />
      <ProductModal
        initialData={editingProdData}
        isOpen={opened}
        close={close}
        onSubmit={
          editingProdData?.create
            ? SubmitCreateShippingData
            : SubmitUpdateShippingData
        }
      />
    </div>
  );
}
