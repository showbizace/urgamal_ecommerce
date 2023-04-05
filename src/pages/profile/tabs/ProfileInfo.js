import ShippingAddressCard from "@/components/ShippingAddressCard/ShippingAddressCard";
import {
  Button,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCirclePlus } from "@tabler/icons-react";
const ProfileInfo = ({ givenName, familyName, mobile, email }) => {
  const form = useForm({
    initialValues: {
      givenName,
      familyName,
      mobile,
    },
  });
  return (
    <div className="flex flex-col   w-full mt-8">
      <Title order={4}>Хувийн мэдээлэл</Title>
      <Text size="xs" c="dimmed">
        Та хувийн мэдээллээ доорх талбаруудаар засварлаарай
      </Text>
      <form className="mt-6">
        <TextInput size="sm" label="Нэр" {...form.getInputProps("givenName")} />
        <TextInput
          size="sm"
          label="Овог"
          {...form.getInputProps("familyName")}
        />
        <TextInput
          size="sm"
          label="Гар утас"
          {...form.getInputProps("mobile")}
        />
      </form>
    </div>
  );
};

export default ProfileInfo;
