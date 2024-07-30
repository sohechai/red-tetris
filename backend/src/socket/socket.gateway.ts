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
import { Game } from 'src/manager/game.manager';
import { SelectGameMode } from 'src/manager/lobby.manager';
import {
  CheckIfUserIsUnique,
  RegisterUser,
  RemoveUser,
} from 'src/manager/users.manager';
import { Player } from 'src/model/player';

@WebSocketGateway(4001)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private wss: Server;
  private logger: Logger = new Logger('AppGateway');
  private players: Player[] = [];

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  handleDisconnect(client: Socket): void {
    this.players = RemoveUser(this.players, client);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('startGame')
  async handleGameStart(client: Socket): Promise<void> {
    this.logger.log(`Client started game: ${client.id}`);
    const game: Game = new Game(this.players, Player.getRoomBySocketId(this.players, client));
    game.game();
    client.to(this.players[this.players.findIndex(player => player.user.client.id === client.id)].user.room).emit("gameStart");
  }

  @SubscribeMessage('selectGameMode')
  handleSelectGameMode(client: Socket, data: { gameMode: number }): void {
    this.logger.log(
      `Client : ${client.id} selected game mode: ${data.gameMode}`,
    );
    this.players = SelectGameMode(this.players, data.gameMode, client);
  }
  
  @SubscribeMessage('rotatePiece')
  handleRotatePiece(client: Socket): void {
    console.log('rotate');
    const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
    if (player.indexOfBag >= 0)
      this.players[this.players.findIndex(player => player.user.client.id === client.id)].map.rotatePiece(player.bag[player.indexOfBag]);
      // this.players[this.players.findIndex(player => player.user.client.id === client.id)].bag[this.players[this.players.findIndex(player => player.user.client.id === client.id)].indexOfBag].rotateRight();
  }

  @SubscribeMessage('movePieceRight')
  handleMovePieceRight(client: Socket): void {
    const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
    if (player.indexOfBag >= 0)
      this.players[this.players.findIndex(player => player.user.client.id === client.id)].map.movePiece(player.bag[player.indexOfBag], 1);
  }

  @SubscribeMessage('movePieceLeft')
  handleMovePieceLeft(client: Socket): void {
    console.log("\n\n\n\n\n\n\n\n\n");
    const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
    if (player.indexOfBag >= 0)
      this.players[this.players.findIndex(player => player.user.client.id === client.id)].map.movePiece(player.bag[player.indexOfBag], -1);
  }
    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, data: { room: string, pseudo: string }): void {
        if (CheckIfUserIsUnique(this.players, data.pseudo) === 1) {
            client.emit("error", "Error: the pseudo is already used");
        }
        else {
            this.players = RegisterUser(this.players, data.pseudo, data.room, client, this.wss);
        }
        this.logger.log(`Client joined room: ${data.room} with pseudo : ${data.pseudo}`);
    }
    
}
