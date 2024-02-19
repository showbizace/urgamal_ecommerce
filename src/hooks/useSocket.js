import { SocketContext } from "@/utils/SocketProvider";
import { useContext } from "react";

const useSocket = () => {
  const mContext = useContext(SocketContext);
  return mContext;
};

export default useSocket;
