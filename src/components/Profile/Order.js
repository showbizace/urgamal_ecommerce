import { Button, Collapse, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { openContextModal } from "@mantine/modals";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const Order = ({ data }) => {
  const Router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const userToken = getCookie("token");
  const [loading, setLoading] = useState(false);
  const [refundStatus, setRefundStatus] = useState("");

  const refundFormRequest = async () => {
    openContextModal({
      modal: "refundDescription",
      title: "Буцаалт хийх",
      innerProps: {
        orderid: data?.orderid,
        setStatus: setRefundStatus,
        status: refundStatus,
      },
      centered: true,
      size: "lg",
      onclose: () => {
        Router.reload();
      },
    });
  };

  const bankInfomation = async () => {
    openContextModal({
      modal: "bankInfo",
      title: "Ta банкны мэдээллээ үнэн зөв оруулна уу!",
      innerProps: {
        orderid: data?.refund_request?.id,
        setStatus: setRefundStatus,
        status: refundStatus,
      },
      centered: true,
      size: "lg",
    });
  };

  const fetchPaymentData = async (orderId) => {
    setLoading(true);
    const axiosReqOption = {
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/order/payment/${orderId}`)
      .then((res) => {
        openContextModal({
          modal: "payment",
          title: "Төлбөр төлөлт",
          innerProps: {
            paymentData: res.data?.invoice,
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
            <p className="text-base ml-1">
              {dayjs(data?.createdAt)
                .add(8, "hours")
                .format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
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

          {data.refund_request === null && data.status.toString() === "200" ? (
            <Button
              variant="light"
              color="red.5"
              loading={loading}
              onClick={(e) => {
                e.stopPropagation();
                refundFormRequest();
              }}
            >
              Буцаалт хийх
            </Button>
          ) : data.refund_request?.status === 100 ? (
            <Badge color="voilet.4" radius="xs" p={15}>
              Хүлээгдэж байна
            </Badge>
          ) : data.refund_request?.status === 200 ? (
            <Button
              variant="light"
              color="indigo"
              loading={loading}
              onClick={(e) => {
                e.stopPropagation();
                bankInfomation();
              }}
            >
              Банк мэдээлэл
            </Button>
          ) : data.refund_request?.status === 300 ? (
            <Badge color="voilet.4" radius="xs" p={15}>
              Хүлээгдэж байна
            </Badge>
          ) : data.refund_request?.status === 400 ? (
            <Badge color="red.9" radius="xs" p={15}>
              Татгалзсан
            </Badge>
          ) : data.refund_request?.status === 500 ? (
            <Badge color="green" radius="xs" p={15}>
              Буцаалт хийгдсэн
            </Badge>
          ) : null}
        </div>
      </div>
      <Collapse in={opened}>
        <div className="w-full py-2 flex flex-row justify-end items-center pr-9">
          <p className="text-grey">Нийт үнийн дүн :</p>
          <p className="ml-1 font-semibold">{data.total}₮</p>
        </div>
      </Collapse>
    </div>
  );
};

export default Order;
