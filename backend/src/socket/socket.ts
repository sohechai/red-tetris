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
import { User } from 'src/users/users';
  
  @WebSocketGateway()
  export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private wss: Server;
    private logger: Logger = new Logger('AppGateway');
    private users: User[] = [];


    afterInit(server: Server) {
      this.logger.log('Initialized!');
    }
    handleDisconnect(client: Socket) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string, pseudo: string): void {
        this.logger.log(`Client joined room: ${room} with pseudo : ${pseudo}`);
        
        client.join(room);
        client.emit("playerInRoom", )
    }
    

}
  