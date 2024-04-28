import { Socket } from 'socket.io';
import { User } from 'src/interface/user';
import { generateNewMap } from 'src/model/map';


export function CheckIfUserIsUnique(users: User[], pseudo: string): number {
    for (let user of users) {
        if (user.pseudo === pseudo)
            return 1; // 1 = error user already exist
    }
    return 0;
}

export function RemoveUser(users: User[], client: Socket) {
    users = users.filter(user => user.client.id !== client.id);
    return users;
}

function SendNewUsersInRoom(users: User[], client: Socket, room: string) {
    const usersInRoom: String[] = [];
    for (let user of users) {
        if(user.room === room)
            usersInRoom.push(user.pseudo);
    }
    client.to(room).emit("usersInRoom", usersInRoom);
}

function RoomAlreadyExist(users: User[], room: string): boolean {
    if (users.findIndex(user => user.room === room))
        return true;
    return false;
}

export function RegisterUser(users: User[], pseudo: string, room: string, client: Socket): User[] {
    users.push({
        pseudo: pseudo,
        room: room,
        client: client,
        gameMode: 1,
        owner: RoomAlreadyExist(users, room) ? false : true,
        map: generateNewMap(),
    });
    client.join(room);
    SendNewUsersInRoom(users, client, room);
    return users;
}