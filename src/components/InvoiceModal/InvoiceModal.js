import { Modal, rem } from "@mantine/core";
import { IconFileInvoice, IconTruckDelivery } from "@tabler/icons-react";
import React from "react";

const InvoiceModal = ({ opened, onClose, handleOrder, handleInvoice }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Захиалгын төрөл" centered>
      <div className="flex flex-row gap-6">
        <div
          className="flex flex-1 flex-col items-center justify-center  py-12 rounded hover:bg-button-yellow hover:text-white"
          onClick={() => handleOrder()}
        >
          <IconTruckDelivery stroke={1.5} size={rem(50)} />
          <p className="mt-2 text-md">Захиалга</p>
        </div>
        <div
          className="flex flex-col flex-1 items-center justify-center rounded hover:bg-button-yellow hover:text-white"
          onClick={() => handleInvoice()}
        >
          <IconFileInvoice stroke={1.5} size={rem(50)} />
          <p className="mt-2 text-md">Нэхэмжлэл</p>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
