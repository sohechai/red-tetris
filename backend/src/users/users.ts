import { Socket } from 'socket.io';

export interface User {
    pseudo: string;
    client: Socket;
    room: string;
}




export function CheckIfUserIsUnique(users: User[], pseudo: string): number {
    for (let user of users) {
        if (user.pseudo === pseudo) {
            return 1; // 1 = error user already exist
        }
    }
    return 0;
}

function sendNewUsersInRoom(users: User[], client: Socket, room: string) {
    const usersInRoom: String[] = [];
    for (let user of users) {
        if(user.room === room) {
            usersInRoom.push(user.pseudo);
        }
    }
    client.to(room).emit("usersInRoom", usersInRoom);
}

export function registerUser(users: User[], pseudo: string, room: string, client: Socket) {
    users.push({
        pseudo: pseudo,
        room: room,
        client: client,
    });
    client.join(room);
    sendNewUsersInRoom(users, client, room);
}