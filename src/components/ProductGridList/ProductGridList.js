import { SimpleGrid, Stack, Text } from "@mantine/core";
import MySkeleton from "../MySkeleton";
import { IconSearch } from "@tabler/icons-react";

export default function ProductGridList({
  children,
  showSkeleton,
  isEmpty,
  emptyStateMessage,
  query,
  cols,
}) {
  return isEmpty ? (
    <div className="w-full h-screen flex justify-center items-start mt-32">
      <Stack align="center">
        <IconSearch size="2rem" stroke={1.5} />
        <Text size="lg" weight={500}>
          Хайлт илэрцгүй
        </Text>
        <Text size="md" weight={500}>
          "{query}"{" "}
          <Text span size="md" weight={400}>
            {emptyStateMessage}
          </Text>
        </Text>
      </Stack>
    </div>
  ) : (
    <SimpleGrid
      cols={cols}
      spacing={20}
      verticalSpacing={20}
      m={0}
      className="flex-grow"
      breakpoints={[
        { maxWidth: "62rem", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "36rem", cols: 1, spacing: "sm" },
      ]}
    >
      {children}
      {showSkeleton &&
        new Array(5).fill(null).map((e, index) => {
          return <MySkeleton key={`product-skeleton-${index}`} />;
        })}
    </SimpleGrid>
  );
}
