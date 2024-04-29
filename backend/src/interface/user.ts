import { Socket } from "socket.io"
import { Map } from "./map";

export interface User {
    pseudo: string;
    client: Socket;
    room: string;
    gameMode: number;
    owner: boolean;
    map: Map;
    score: number;
}

export interface UserInfo {
    pseudo: string;
    room: string;
    gameMode: number;
    owner: boolean;
    score: number;
}
// convertir en class et ajouter toutes les fonctions en rapport avec la map.