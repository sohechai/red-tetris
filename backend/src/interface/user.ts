import { Socket } from "socket.io"
import { Map } from "./map";

export interface User {
    pseudo: string;
    client: Socket;
    room: string;
    gameMode: number;
    owner: boolean;
    map: Map;
}