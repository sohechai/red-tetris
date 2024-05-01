import { Socket } from "socket.io"

export interface User {
    pseudo: string;
    client: Socket;
    room: string;
    gameMode: number;
    owner: boolean;
    score: number;
}

export interface UserInfo {
    pseudo: string;
    room: string;
    gameMode: number;
    owner: boolean;
    score: number;
}
