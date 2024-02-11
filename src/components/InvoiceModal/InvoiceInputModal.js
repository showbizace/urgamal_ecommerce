import { Button, Input, Modal, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import React, { useState } from "react";

const InvoiceInputModal = ({ opened, onClose, handleInvoiceInput }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const handleClick = () => {
    handleInvoiceInput(name, phone, setErrorName, setErrorPhone);
  };
  return (
    <Modal centered opened={opened} onClose={onClose} title="Нэхэмжлэх бөглөх">
      <TextInput
        label="Компани нэр"
        placeholder="Компани нэр"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      {errorName && (
        <Input.Error className="mt-1">Компани нэр үг хоосон байна</Input.Error>
      )}
      <div className="mt-4">
        <TextInput
          label="Утасны дугаар"
          placeholder="Утасны дугаар"
          type="number"
          value={phone}
          maxLength={8}
          onChange={(event) => setPhone(event.currentTarget.value)}
        />
        {errorPhone && (
          <Input.Error className="mt-1">
            Утасны дугаар үг хоосон байна
          </Input.Error>
        )}
      </div>
      <div className="mt-3 w-full flex justify-end">
        <Button
          color="yellow"
          className="w-full"
          leftIcon={<IconSend stroke={2} size={rem(20)} />}
          onClick={() => handleClick()}
        >
          Илгээх
        </Button>
      </div>
    </Modal>
  );
};

export default InvoiceInputModal;
