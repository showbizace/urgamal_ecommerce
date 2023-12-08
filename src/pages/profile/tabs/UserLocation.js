import { Button, Skeleton, Group, Badge, Text, Card } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ProductModal from "@/components/Profile/ProfileModal";
import { DeleteConfirmationDialog } from "@/components/Profile/deleteAddress";
import { useEffect, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { getCookie } from "cookies-next";
const cookie = getCookie("token");

const UserLocation = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmationOpened, handlers] = useDisclosure(false);
  const [post, setPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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

  useEffect(() => {
    getShippingData();
  }, []);

  const openDeleteConfirmation = (Id) => {
    setDeletingAddress({ id: Id });
    handlers.open();
  };

  const getShippingData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOptions)
      .then((req) => req.json())
      .then((res) => {
        if (res.success === true) {
          setLoading(false);
          setData(res.data);
        }
      });
  };

  const SubmitCreateShippingData = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const initialData = {
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
    };

    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(initialData),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOption)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          showNotification({
            message: result.message,
            color: "green",
          });
          setPost(true);
          getShippingData();
          close;
        } else {
          showNotification({
            message: result.message,
            color: "red",
          });
          setPost(false);
        }
      });
  };

  const SubmitUpdateShippingData = async (values) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${cookie}`);
    // myHeaders.append("Content-Type", "application/json");
    // const initialData = {
    //   id: values.id,
    //   city: values.city,
    //   province: values.province,
    //   district: values.district,
    //   committee: values.committee,
    //   street: values.street,
    //   fence: values.fence,
    //   apartment: values.apartment,
    //   number: values.number,
    //   phone: values.phone,
    //   type: values.type ? values.type : false,
    // };
    // const requestOption = {
    //   method: "PUT",
    //   headers: myHeaders,
    //   body: JSON.stringify(initialData),
    // };
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOption)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.success) {
    //       showNotification({
    //         message: result.message,
    //         color: "green",
    //       });
    //       setPost(true);
    //       getShippingData();
    //       close;
    //     } else {
    //       showNotification({
    //         message: result.message,
    //         color: "red",
    //       });
    //     }
    //   });
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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOption)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          showNotification({
            title: "Хаяг амжилттай устгалаа.",
            message: result.message,
            color: "green",
          });
          getShippingData();
        } else {
          showNotification({
            message: result.message,
            color: "red",
          });
        }
      });
    handlers.close();
  };

  return (
    <div style={{ width: "72.5%" }} className="flex flex-col">
      {!loading ? (
        <div className="bg-white ml-8 w-full rounded-md py-4 px-12 ">
          <div className="flex flex-row justify-between">
            <p className="font-[500] text-[1.3rem] text-[#212529]">Хаяг</p>

            <Group position="center">
              <Button
                leftIcon={<IconCirclePlus size={20} />}
                variant="subtle"
                compact
                onClick={(e) => {
                  e.preventDefault();
                  openProductEditingModal({}, "creation");
                }}
              >
                Шинэ хаяг нэмэх
              </Button>
            </Group>
          </div>

          <div className="flex flex-col gap-6 my-3 w-full overflow-auto">
            <Group>
              <div className="flex my-4 gap-6">
                {data.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <Card
                        shadow="sm"
                        padding="sm"
                        radius="md"
                        sx={{ width: "320px" }}
                        withBorder
                      >
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="flex flex-col gap-2 w-full">
                            {item.type ? (
                              <div className="flex flex-row justify-between items-center">
                                {/* <Text fw={500}>{item.type}</Text>  */}
                                <Badge color="teal" variant="filled">
                                  Орон нутаг
                                </Badge>
                              </div>
                            ) : (
                              <div className="flex flex-row justify-between items-center">
                                {/* <Text fw={500}>{item.type}</Text>  */}
                                <Text fw={500}>Улаанбаатар</Text>
                              </div>
                            )}
                          </div>
                          {/* <Radio value={item.id} /> */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row justify-between gap-20 w-full">
                              {item.type ? (
                                <>
                                  <Text
                                    fz="md"
                                    c="dimmed"
                                    className="flex flex-row break-word"
                                  >
                                    Хот:
                                  </Text>
                                  <Text fz="md" sx={{ lineBreak: "anywhere" }}>
                                    {item.city}
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <Text
                                    fz="md"
                                    c="dimmed"
                                    className="flex flex-row break-word"
                                  >
                                    Аймаг:
                                  </Text>
                                  <Text fz="md" sx={{ lineBreak: "anywhere" }}>
                                    {item.province}
                                  </Text>
                                </>
                              )}
                            </div>
                            <div className="flex flex-row justify-between gap-20 w-full">
                              <>
                                <Text
                                  fz="md"
                                  c="dimmed"
                                  className="flex flex-row"
                                >
                                  Дүүрэг:
                                </Text>
                                <Text fz="md" sx={{ lineBreak: "anywhere" }}>
                                  {item.district}
                                </Text>
                              </>
                            </div>
                            <div className="flex flex-row justify-between gap-20 w-full">
                              <>
                                <Text
                                  fz="md"
                                  c="dimmed"
                                  className="flex flex-row "
                                >
                                  Хороо:
                                </Text>
                                <Text fz="md">{item.committee}</Text>
                              </>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                              <Text
                                fz="md"
                                c="dimmed"
                                className="flex flex-row "
                              >
                                Гудамж, хороолол:
                              </Text>
                              <Text fz="md">{item.street}</Text>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                              <Text
                                fz="md"
                                c="dimmed"
                                className="flex flex-row "
                              >
                                Хашаа, байр:
                              </Text>
                              <Text fz="md">{item.apartment}</Text>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                              <Text
                                fz="md"
                                c="dimmed"
                                className="flex flex-row "
                              >
                                Тоот:
                              </Text>
                              <Text fz="md">{item.number}</Text>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                              <Text
                                fz="md"
                                c="dimmed"
                                className="flex flex-row "
                              >
                                Утас:
                              </Text>
                              <Text fz="md">{item.phone}</Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row mt-4 gap-8 justify-center">
                          <Button
                            variant="subtle"
                            color="red"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteConfirmation(item.id);
                            }}
                          >
                            Устгах
                          </Button>
                          <Button
                            variant="light"
                            color="yellow"
                            onClick={(e) => {
                              e.stopPropagation();
                              openProductEditingModal(item);
                            }}
                          >
                            Засах
                          </Button>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </Group>
          </div>
        </div>
      ) : (
        <Skeleton sx={{ marginLeft: "40px", height: "100%" }} visible={loading}>
          loading
        </Skeleton>
      )}
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
};

export default UserLocation;
