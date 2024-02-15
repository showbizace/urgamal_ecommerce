import { Accordion, Skeleton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import Category from "./category";

function AllCategory({ type = "default", categories, isLoading }) {
  return (
    <div className="h-full">
      <ul role="list" className="relative flex flex-col gap-2 h-full mt-6 ">
        <Category />
      </ul>
    </div>
  );
}

export default AllCategory;
