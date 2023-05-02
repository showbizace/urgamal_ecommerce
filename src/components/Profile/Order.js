import { Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CollapseItem from "./CollapseItem";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { openContextModal } from "@mantine/modals";

const Order = ({ data }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const userToken = getCookie("token");
  const [loading, setLoading] = useState(false);
  const fetchPaymentData = async (orderId) => {
    setLoading(true);
    const axiosReqOption = {
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment`,
        { orderid: orderId },
        axiosReqOption
      )
      .then((res) => {
        openContextModal({
          modal: "payment",
          title: "Төлбөр төлөлт",
          innerProps: {
            paymentData: res.data.data,
          },
          centered: true,
          size: "lg",
        });
      })
      .catch((err) => {
        if (err.response) {
          showNotification({
            message: err.response.data.message,
            color: "red",
          });
        } else {
          showNotification({
            message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
            color: "red",
          });
        }
      });
    setLoading(false);
  };
  return (
    <div>
      <div
        className="flex flex-row justify-between items-center p-2 hover:bg-gray-50 hover:cursor-pointer"
        onClick={toggle}
        style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-base text-grey">Захиалгын дугаар :</p>
            <p className="text-base ml-1">{data?.orderid}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-base text-grey">Огноо : </p>
            <p className="text-base ml-1">{data?.createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {/* <Button variant="outline" color={"red"}>Захиалга цуцлах</Button> */}
          {/* <Button variant="outline" color={"dark"}>
						Дэлгэрэнгүй
					</Button> */}
          {data.status.toString() === "100" && (
            <Button
              variant="light"
              color="orange"
              loading={loading}
              onClick={(e) => {
                e.stopPropagation();
                fetchPaymentData(data?.orderid);
              }}
            >
              Төлбөр төлөх
            </Button>
          )}
        </div>
      </div>
      <Collapse in={opened}>
        <CollapseItem orderItems={data.order_items} total={data.total} />
        <div className="w-full py-2 flex flex-row justify-end items-center pr-9">
          <p className="text-grey">Нийт үнийн дүн :</p>
          <p className="ml-1 font-semibold">{data.total}₮</p>
        </div>
      </Collapse>
    </div>
  );
};

export default Order;
