import { io } from "socket.io-client";

const socket = io("http://10.14.2.3:4001", { transports: ["websocket"] });

export default socket;
