import InvoiceItem from "@/components/InvoiceItem";
import { fetchMethod } from "@/utils/fetch";
import { Loader, Title, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { openContextModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconCircleXFilled, IconReportOff } from "@tabler/icons-react";
const Invoice = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInvoice = async () => {
    setLoading(true);
    const token = getCookie("token");
    const requestOption = {
      status: "all",
    };
    const data = await fetchMethod("POST", "user/order", token, requestOption);
    if (data?.success) {
      const filtered = data?.data?.filter(
        (item) => item?.method === "invoicing"
      );
      setInvoiceList(filtered);
      setLoading(false);
    } else {
      console.log(data?.message, "err");
    }
    setLoading(false);
  };

  useEffect(() => {
    getInvoice();
  }, []);

  const handleInvoice = async (id) => {
    openContextModal({
      modal: "invoiceFile",
      title: "Нэхэмжлэл дэлгэрэнгүй",
      centered: true,
      style: { padding: "8px" },
    });
    // const data = await fetchMethod("GET", `order/invoice/file?orderid=${id}`);
    // if (data.success) {
    //   openContextModal({
    //     modal: "invoiceFile",
    //     title: "Нэхэмжлэл дэлгэрэнгүй",
    //     centered: true,
    //     innerProps: {
    //       data: data.invoice,
    //     },
    //     size: "lg",
    //   });
    // } else {
    //   showNotification({
    //     message: data?.message,
    //     color: "red",
    //     icon: (
    //       <IconCircleXFilled
    //         style={{
    //           width: rem(30),
    //           height: rem(30),
    //         }}
    //       />
    //     ),
    //   });
    // }
  };

  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      <Title order={3}>Нэхэмжлэл</Title>
      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Loader color="yellow" size={"md"} />
        </div>
      ) : invoiceList.length > 0 ? (
        <div className="mt-4">
          {invoiceList.map((item, index) => (
            <InvoiceItem
              data={item}
              index={index}
              key={index}
              handleInvoice={handleInvoice}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex-col h-96 flex items-center justify-center">
          <IconReportOff size="2rem" stroke={1.5} />
          <span className="mt-2 font-medium text-base text-grey">
            Нэхэмжлэл байхгүй байна.
          </span>
        </div>
      )}
    </div>
  );
};

export default Invoice;
