import { SimpleGrid } from "@mantine/core";
import MySkeleton from "../MySkeleton";

export default function ProductGridList({ children, showSkeleton }) {
  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
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
