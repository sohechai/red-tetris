import { Server, Socket } from 'socket.io';

export const createMockSocket = (id: string) => {
  return {
    id,
    join: jest.fn(),
    emit: jest.fn()
  } as unknown as Socket;
};

export const createMockServer = () => {
  return {
    to: jest.fn().mockReturnThis(),
    emit: jest.fn()
  } as unknown as Server;
};