import io from "socket.io-client";

export const createConnection = () => {
  const socket = io("https://api.urga.mn/dev");
  if (socket.connected) {
    return socket;
  }
};
