import { CategoryContext } from "@/utils/categoryContextProvider";
import { useContext } from "react";

const useCategories = () => {
  const mContext = useContext(CategoryContext);

  return mContext;
};

export default useCategories;
