import { TextInput, PasswordInput, Select, Button, rem } from "@mantine/core";
import React from "react";
import { DateInput } from "@mantine/dates";
import {
  IconUser,
  IconUserCircle,
  IconMail,
  IconPhone,
  IconCalendarClock,
  IconShieldLock,
  IconGenderMale,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
const UserEdit = (props) => {
  const { givenName, familyName, mobile, email } = props;
  const form = useForm({
    initialValues: {
      givenName,
      familyName,
      mobile,
    },
  });
  return (
    <form className="mt-4">
      <div className="w-full flex flex-row gap-8">
        <div className="w-full">
          <TextInput
            size="sm"
            label="Овог"
            icon={
              <IconUser
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
                stroke={2}
              />
            }
            placeholder="Овог"
            {...form.getInputProps("familyName")}
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
        </div>
        <div className="w-full">
          <TextInput
            size="sm"
            label="Нэр"
            placeholder="Нэр"
            {...form.getInputProps("givenName")}
            icon={
              <IconUserCircle
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
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
        </div>
      </div>
      <div className="w-full flex flex-row gap-8 mt-4">
        <div className="w-full">
          <TextInput
            size="sm"
            label="Цахим шуудан"
            icon={
              <IconMail
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
                stroke={2}
              />
            }
            placeholder="Цахим шуудан"
            {...form.getInputProps("familyName")}
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
        </div>
        <div className="w-full">
          <TextInput
            size="sm"
            label="Утасны дугаар"
            {...form.getInputProps("givenName")}
            placeholder="Утасны дугаар"
            icon={
              <IconPhone
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
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
        </div>
      </div>
      <div className="w-full flex flex-row gap-8 mt-4">
        <div className="w-full">
          <PasswordInput
            size="sm"
            label="Нууц үг"
            placeholder="*********"
            icon={
              <IconShieldLock
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
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
        </div>
        <div className="w-full">
          <DateInput
            dateParser={(input) => {
              if (input === "WW2") {
                return new Date(1939, 8, 1);
              }
              return new Date(input);
            }}
            icon={
              <IconCalendarClock
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
                stroke={2}
              />
            }
            valueFormat="YYYY/MM/DD"
            label="Төрсөн огноо"
            placeholder="Төрсөн огноо"
            maw={400}
            mx="auto"
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
        </div>
      </div>
      <div className="w-full flex flex-row gap-8 mt-4">
        <div className="w-full">
          <Select
            placeholder="Хүйс"
            label="Хүйс"
            data={["Эрэгтэй", "Эмэгтэй"]}
            icon={
              <IconGenderMale
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
                stroke={2}
              />
            }
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              item: {
                // applies styles to selected item
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor: "#F9BC60",
                    color: "white",
                  },
                },
              },
            })}
          />
        </div>
        <div className="w-full"></div>
      </div>
      <div className="w-full flex flex-row justify-end gap-8 mt-4">
        <Button variant="outline" color="red">
          Арилгах
        </Button>
        <Button
          variant="filled"
          color="orange"
          styles={(theme) => ({
            root: {
              backgroundColor: "#F9BC60",
            },
          })}
        >
          Хадгалах
        </Button>
      </div>
    </form>
  );
};

export default UserEdit;
