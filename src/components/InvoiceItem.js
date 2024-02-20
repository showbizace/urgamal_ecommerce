import { Button, Collapse, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconCircleXFilled,
  IconPhotoOff,
} from "@tabler/icons-react";
import { openContextModal } from "@mantine/modals";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { fetchMethod } from "@/utils/fetch";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";

const InvoiceItem = ({ data, index }) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div>
      <div
        key={index}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 hover:bg-gray-50 hover:cursor-pointer"
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
              {dayjs(data?.createdAt)?.format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
        <StatusButton status={data.status} data={data} />
      </div>
      <Collapse in={opened}>
        <div>
          <div className="w-full py-2 flex flex-col items-center">
            {data?.order?.order_item &&
              data?.order?.order_item?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row p-4 w-full"
                    style={{ borderBottom: "2px solid #DADEDE" }}
                  >
                    {item?.product?.additionalImage?.lengh > 0 ? (
                      <Image
                        loader={() => item?.product?.additionalImage[0]?.url}
                        src={item?.product?.additionalImage[0]?.url}
                        alt={item?.product?.additionalImage[0]?.url}
                        width={100}
                        height={150}
                        className="sm:w-32 sm:h-32 h-48 object-contain"
                      />
                    ) : (
                      <div className="product-card-img flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md sm:w-32 h-48 sm:h-32">
                        <ThemeIcon size="lg" variant="light" color="green">
                          <IconPhotoOff size="80%" stroke={0.5} />
                        </ThemeIcon>
                      </div>
                    )}
                    <div className="flex flex-col sm:justify-evenly sm:ml-3 ">
                      <p className="font-semibold text-sm lg:text-base">
                        {item?.name}
                      </p>
                      <div className="flex flex-row items-center mt-1">
                        <p className="text-sm lg:text-base">
                          Ширхэг: {item?.qty}
                        </p>
                        <p className="ml-4 text-sm lg:text-base">
                          Нэгж үнэ: {item?.price}₮
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end">
            <p className="text-grey">Нийт үнийн дүн :</p>
            <p className="ml-1 font-semibold">{data?.order?.total}₮</p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

const StatusButton = ({ status, data }) => {
  const handleInvoice = () => {
    openContextModal({
      modal: "invoiceFile",
      title: "Нэхэмжлэл дэлгэрэнгүй",
      centered: true,
      style: { padding: "8px" },
      innerProps: { data },
    });
  };

  const paymentDone = async () => {
    const token = getCookie("token");
    const res = await fetchMethod(
      "GET",
      `order/invoice/payment?orderid=${data?.orderid}`,
      token
    );
    if (res?.success) {
      showNotification({
        message: "Төлбөрийн мэдээлэл амжилттай илгээгдлээ.",
        icon: <IconCheck />,
        color: "green",
      });
    } else {
      showNotification({
        message: res?.message,
        color: "red",
        icon: (
          <IconCircleXFilled
            style={{
              width: rem(30),
              height: rem(30),
            }}
          />
        ),
      });
    }
  };

  switch (status) {
    case 100:
      return (
        <div className="flex flex-row justify-end sm:justify-start gap-2 mt-1 sm:mt-0">
          <Button
            variant="outline"
            color="orange"
            onClick={(e) => {
              e.stopPropagation();
              handleInvoice();
            }}
          >
            Дэлгэрэнгүй
          </Button>
        </div>
      );
    case 200:
      return (
        <div className="flex flex-row justify-end sm:justify-start gap-2 mt-1 sm:mt-0">
          <Button
            variant="filled"
            color="orange"
            onClick={(e) => {
              e.stopPropagation();
              paymentDone();
            }}
          >
            Төлбөр хийгдсэн
          </Button>
        </div>
      );
    default:
      null;
  }
};
export default InvoiceItem;
