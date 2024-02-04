import io from "socket.io-client";

let socket = io("https://api.urga.mn/");

export default socket;
