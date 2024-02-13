import { Button, Collapse, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhotoOff } from "@tabler/icons-react";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

const InvoiceItem = ({ data, index, handleInvoice }) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div>
      <div
        key={index}
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
              {dayjs(data?.createdAt)?.format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            color="orange"
            onClick={(e) => {
              e.stopPropagation();
              handleInvoice(data?.order?.orderid);
            }}
          >
            Дэлгэрэнгүй
          </Button>
        </div>
      </div>
      <Collapse in={opened}>
        <div>
          <div className="w-full py-2 flex flex-row items-center">
            {data?.order_item &&
              data?.order_item.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row gap-4 pt-2 pb-4  w-full"
                    style={{ borderBottom: "2px solid #DADEDE" }}
                  >
                    {item?.product?.additionalImage?.lengh > 0 ? (
                      <Image
                        loader={() => item?.product?.additionalImage[0]?.url}
                        src={item?.product?.additionalImage[0]?.url}
                        alt={item?.product?.additionalImage[0]?.url}
                        width={100}
                        height={150}
                        className="w-32 h-32 object-contain"
                      />
                    ) : (
                      <div className="product-card-img flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md w-32 h-32 ">
                        <ThemeIcon size="lg" variant="light" color="green">
                          <IconPhotoOff size="80%" stroke={0.5} />
                        </ThemeIcon>
                      </div>
                    )}
                    <div className="flex flex-col justify-evenly">
                      <Text size={"lg"}>{item?.name}</Text>

                      <Text size={"sm"}>Ширхэг: {item?.qty}</Text>

                      <Text size={"sm"}>Нэгж үнэ: {item?.price}</Text>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end">
            <p className="text-grey">Нийт үнийн дүн :</p>
            <p className="ml-1 font-semibold">{data?.total}₮</p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default InvoiceItem;
