import React, { useContext } from "react";
import { WishlistContext } from "./wishlistProvider";

const useWishlist = () => {
  const mContext = useContext(WishlistContext);

  return mContext;
};

export default useWishlist;
