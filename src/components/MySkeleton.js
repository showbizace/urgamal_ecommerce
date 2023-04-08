import { Skeleton } from "@mantine/core";
const MySkeleton = ({ key }) => {
  return (
    <div key={key || ""} className="bg-white rounded-md h-full w-full">
      <Skeleton mb="xl" width={"100%"} height={"40%"} />
      <div className="p-3 -mt-4">
        <Skeleton height={12} />
        <Skeleton height={12} mt={10} />
        <Skeleton height={12} mt={10} width="80%" />
        <Skeleton height={12} mt={10} width="50%" />
        <Skeleton height={12} mt={10} />
        <Skeleton height={12} mt={10} width="80%" />
        <Skeleton height={12} mt={10} width="50%" />
      </div>
    </div>
  );
};

export default MySkeleton;
