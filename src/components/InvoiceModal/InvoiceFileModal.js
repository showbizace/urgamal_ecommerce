import { htmlFrom } from "@/utils/constant";
import React from "react";

const InvoiceFileModal = ({ context, id, innerProps }) => {
  console.log(innerProps, "inner");
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlFrom(innerProps?.data),
      }}
    />
  );
};

export default InvoiceFileModal;
