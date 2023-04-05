import {
  ActionIcon,
  Button,
  Card,
  Collapse,
  Group,
  Paper,
  Text,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";

export default function ShippingAddressCard({ name, address }) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Card p="xs" radius="md" withBorder>
      <Group position="apart">
        <Text weight="500" size="sm">
          {name}
        </Text>
        <Group spacing="xs">
          <ActionIcon color="blue" radius="xl">
            <IconEdit size="1.2rem" />
          </ActionIcon>
          <ActionIcon color="red" radius="xl">
            <IconTrash size="1.2rem" />
          </ActionIcon>
        </Group>
      </Group>
      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex flex-col gap-2 w-full">{address.type}</div>
        <div className="flex flex-col gap-4 w-full pr-8">
          <Text size="sm" weight={500} color="grey">
            {`${address.city ? address.city : ""} ${
              address.district ? address.district : ""
            } ${address.committee ? address.committee : ""}
            ${address.street ? address.street : ""} ${
              address.apartment ? address.apartment : ""
            } ${address.number ? address.number : ""} 
            ${address.phone ? address.phone : ""}`.replaceAll(/\s+/g, ", ")}
          </Text>
          <Text size="xs" weight={500}>
            Нэмэлт тайлбар:
            {address.note}
          </Text>
        </div>
      </div>
    </Card>
  );
}
