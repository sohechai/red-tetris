import { io } from "socket.io-client";

const socket = io("http://10.13.5.6:4001", { transports: ["websocket"] });

export default socket;
