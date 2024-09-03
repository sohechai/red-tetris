import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from 'src/socket/socket.gateway'; // Adjust the path as necessary
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

describe('AppGateway', () => {
    let gateway: AppGateway;
    let module: TestingModule;
    let mockServer: Server;
    let mockClient: Socket;
    let loggerSpy: jest.SpyInstance;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
        providers: [AppGateway],
      }).compile();
  
      gateway = module.get<AppGateway>(AppGateway);
      mockServer = {
        to: jest.fn().mockReturnThis(),
        emit: jest.fn(),
      } as any;
      mockClient = {
        id: '1',
        join: jest.fn(),
        leave: jest.fn(),
        emit: jest.fn(),
      } as any;
  
      // Mock the wss property
      Object.defineProperty(gateway, 'wss', { value: mockServer });
  
      // Spy on the logger's log method
      loggerSpy = jest.spyOn(Logger.prototype, 'log');
    });
  
    afterAll(async () => {
      await module.close();
      loggerSpy.mockRestore();
    });
  
    it('should be defined', () => {
      expect(gateway).toBeDefined();
    });
  
    it('should handle a client connection', () => {
      gateway.handleConnection(mockClient);
      expect(loggerSpy).toHaveBeenCalledWith(`Client connected: ${mockClient.id}`);
    });
  
    it('should handle a client deconnection', () => {
        gateway.handleDisconnect(mockClient);
        expect(loggerSpy).toHaveBeenCalledWith(`Client disconnected: ${mockClient.id}`);
      });
    it('should handle piece movement', () => {
        gateway.handleMovePieceLeft(mockClient);
      });
    it('should handle a client deconnection', () => {
        gateway.handleMovePieceRight(mockClient);
      });

      it('should handle a player joining room', () => {
        gateway.handleJoinRoom(mockClient, {room: "test", pseudo: "test"});
      });
      it('should handle a player drop piece', () => {
        gateway.handleDropPiece(mockClient);
      });
  });