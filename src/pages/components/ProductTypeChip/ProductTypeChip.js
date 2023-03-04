import React from "react";

export default function ProductTypeChip({ name }) {
  return (
    <div className="px-2 py-[2px] bg-chip-grey rounded-md">
      <span className=" font-semibold text-sm  text-chip-text">{name}</span>
    </div>
  );
}
