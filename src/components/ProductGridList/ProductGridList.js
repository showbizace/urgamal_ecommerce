import { SimpleGrid, Stack, Text } from "@mantine/core";
import MySkeleton from "../MySkeleton";
import { IconSearch } from "@tabler/icons-react";

export default function ProductGridList({
  children,
  showSkeleton,
  isEmpty,
  emptyStateMessage,
  query,
  className,
}) {
  return isEmpty ? (
    <div className={`w-full h-screen flex justify-center items-start mt-32`}>
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
      cols={4}
      spacing={20}
      verticalSpacing={20}
      className={`flex-grow ${className}`}
      breakpoints={[
        { maxWidth: "110em", cols: 4, spacing: "md" },
        { maxWidth: "74em", cols: 3, spacing: "md" },
        { maxWidth: "64em", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "30em", cols: 2, spacing: "xs" },
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
