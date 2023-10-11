import {
  Button,
  Flex,
  Group,
  Stack,
  Radio,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconCircleCheck,
  IconCirclePlus,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";

export default function UserBasicInfo({ data, refresh }) {
  const dateValue = data?.birthdate?.toString();
  const form = useForm({
    initialValues: {
      givenName: data?.given_name,
      familyName: data?.family_name,
      mobile: data?.mobile?.toString(),
      birthdate: dateValue && dateValue,
      gender: data?.gender,
    },
    validate: {
      givenName: isNotEmpty("Нэр оруулна уу"),
      familyName: isNotEmpty("Овог оруулна уу"),
    },
  });

  console.log(dateValue);

  const handleEdit = ({ givenName, familyName, birthdate, gender }) => {
    const data = {
      given_name: givenName,
      family_name: familyName,
      birthdate: birthdate,
      gender: gender,
    };

    console.log(birthdate);

    console.log(data);
    // Make a POST request to the specified URL with the data as the request body
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const res = await response.json();
          throw new Error(res.message);
        }
        return response.json();
      })
      .then((data) => {
        showNotification({
          message: data.message,
          icon: <IconCheck />,
          color: "green",
        });
        refresh();
      })
      .catch((error) => {
        showNotification({
          message: error.message,

          color: "red",
        });
      });
  };
  return (
    <div className="flex flex-col w-full max-w-md">
      <Title order={4}>Хувийн мэдээлэл</Title>
      <Text size="xs" c="dimmed">
        Та хувийн мэдээллээ доорх талбаруудаар засварлаарай
      </Text>
      <form
        className="mt-6"
        onSubmit={form.onSubmit((values) => handleEdit(values))}
      >
        <Stack spacing="lg">
          <TextInput
            size="sm"
            label="Нэр"
            {...form.getInputProps("givenName")}
            withAsterisk
          />
          <TextInput
            size="sm"
            label="Овог"
            {...form.getInputProps("familyName")}
            withAsterisk
          />

          <TextInput
            size="sm"
            label="Нас"
            {...form.getInputProps("birthdate")}
            withAsterisk
          />
          <Radio.Group
            label="Хүйс"
            withAsterisk
            {...form.getInputProps("gender")}
          >
            <Group mt="xs">
              <Radio value="male" color="yellow.6" label="Эрэгтэй" />
              <Radio value="female" color="yellow.6" label="Эмэгтэй" />
            </Group>
          </Radio.Group>
          <TextInput
            size="sm"
            label="Гар утас"
            disabled
            {...form.getInputProps("mobile")}
            withAsterisk
          />
        </Stack>
        <Group mt="xl" position="right">
          <Button variant="subtle" color="red">
            Цуцлах
          </Button>
          <Button type="submit" color="yellow">
            Засварлах
          </Button>
        </Group>
      </form>
    </div>
  );
}
