import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SelectGameMode } from 'src/manager/lobbyManager';
import { User } from 'src/interface/user';
import {
  CheckIfUserIsUnique,
  RegisterUser,
  RemoveUser,
} from 'src/manager/usersManager';
@WebSocketGateway(4001)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private wss: Server;
  private logger: Logger = new Logger('AppGateway');
  private users: User[] = [];

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  handleDisconnect(client: Socket) {
    this.users = RemoveUser(this.users, client);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('startGame')
  handleGameStart(client: Socket) {
    this.logger.log(`Client started game: ${client.id}`);
  }

  @SubscribeMessage('selectGameMode')
  handleSelectGameMode(client: Socket, data: { gameMode: number }) {
    this.logger.log(
      `Client : ${client.id} selected game mode: ${data.gameMode}`,
    );
    SelectGameMode(this.users, data.gameMode, client);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: { room: string; pseudo: string }): void {
    this.logger.log(
      `Client joined room: ${data.room} with pseudo : ${data.pseudo}`,
    );
    if (CheckIfUserIsUnique(this.users, data.pseudo) === 1) {
      client.emit('error', 'Error: the pseudo is already used');
    } else {
      RegisterUser(this.users, data.pseudo, data.room, client);
    }
  }
}
