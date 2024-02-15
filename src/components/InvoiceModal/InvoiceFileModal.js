import { htmlFrom } from "@/utils/constant";
import { Button, TextInput, rem } from "@mantine/core";
import {
  IconAddressBook,
  IconBuilding,
  IconLocation,
  IconPhone,
} from "@tabler/icons-react";
import React from "react";

const InvoiceFileModal = ({ context, id, innerProps }) => {
  return (
    <div className="flex flex-col gap-3">
      <TextInput
        size="sm"
        label="Хаяг"
        value={"test"}
        icon={
          <IconLocation
            style={{
              width: rem(20),
              height: rem(20),
              color: "#F9BC60",
            }}
            stroke={2}
          />
        }
        placeholder="Хаяг"
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <TextInput
        size="sm"
        label="Байгуулагын нэр"
        value={"Сайнуу ХХК"}
        icon={
          <IconBuilding
            style={{
              width: rem(20),
              height: rem(20),
              color: "#F9BC60",
            }}
            stroke={2}
          />
        }
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <TextInput
        size="sm"
        label="Утасны дугаар"
        placeholder="Утасны дугаар"
        value={"88560939"}
        onChange={(event) =>
          setUserInfo({
            ...data,
            mobile: event.currentTarget.value,
          })
        }
        icon={
          <IconPhone
            style={{
              width: rem(20),
              height: rem(20),
              color: "#F9BC60",
            }}
            stroke={2}
          />
        }
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <Button
        color="yellow"
        className="mt-6"
        onClick={() => context.closeModal(id)}
      >
        Баталгаажуулах
      </Button>
    </div>
  );
};

export default InvoiceFileModal;
