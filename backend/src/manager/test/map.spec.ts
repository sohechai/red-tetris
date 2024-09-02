import { Map } from 'src/manager/map.manager';
import { Block } from 'src/manager/block.manager';
import { iBlock } from 'src/model/block';
import { Server, Socket } from 'socket.io';
import { IMap } from 'src/interface/map';

const mockEmit = jest.fn();
const mockJoin = jest.fn();
const mockTo = jest.fn(() => ({ emit: mockEmit }));
const mockSocket = { id: 'test-client-id', emit: mockEmit, join: mockJoin, to: mockTo } as unknown as Socket;
const mockServer = { id: 'test-client-id', emit: mockEmit, join: mockJoin, to: mockTo } as unknown as Server;

describe('Map', () => {
  let map: Map;

  beforeEach(() => {
    map = new Map();
  });

  it('should initialize with correct default values', () => {
    expect(map.map).toHaveLength(22);
    expect(map.map[0]).toHaveLength(12);
    expect(map.map[21].every(cell => cell === 10)).toBe(true);
    expect(map.map[0].every(cell => cell === 10 || cell === 0)).toBe(true);
  });

  it('should correctly fall a block', async () => {
    const block = new Block(iBlock);

    await map.blockFall(block);
    expect(block.position[0]).toBe(1); // Assumes the block falls one row
  });

  it('should drop a block correctly', async () => {
    const block = new Block(iBlock);
    map.addFallingBlock(block);
    await map.dropOne(block, {id : "test-id"} as Socket, new Server); // Provide mock Socket and Server
    expect(block.position[0]).toBe(1);
  });

  it('should rotate a block correctly', async () => {
    let map1 = new Map();
    const block = new Block(iBlock);
    block.position[0] = 5;
    block.position[1] = 5;
    await map1.rotatePiece(block, mockSocket, mockServer); // Provide mock Socket and Server
    expect(block.rotation).toBe(0); // After rotation, the rotation index should change
    await map1.addFallingBlock(block);
    await map1.rotatePiece(block, mockSocket, mockServer); // Provide mock Socket and Server
    expect(block.rotation).toBe(1); // After rotation, the rotation index should change
  });

  it('should move a block correctly', async () => {
    let map1 = new Map();
    const block = new Block(iBlock);
    const oldPos = block.position[1];
    block.position[0] = 5;
    block.position[1] = 5;
    await map1.movePiece(block, 1, mockSocket, mockServer); // Move block right by 1
    expect(block.position[1]).toBe(oldPos); // Ensure the block has moved right
    
    await map1.addFallingBlock(block);
    await map1.movePiece(block, 1, mockSocket, mockServer); // Move block right by 1
    expect(block.position[1]).toBe(oldPos + 1); // Ensure the block has moved right
  });

  it('should correctly identify if a block is falling', async () => {
    expect(map.isBlockFalling()).toBe(false); // Test with initial map
    let map1 = new Map();
    const block = new Block(iBlock);
    block.position[0] = 5;
    block.position[1] = 5;
    await map1.addFallingBlock(block);
    expect(map1.isBlockFalling()).toBe(true);

  });

  it('should identify if a move is valid or not', async () => {
    let newMap: IMap = [...map.map]
    let result = map.isValidMove(newMap)
    expect(result).toBe(true); 
  });

  it('should identify and handle line formation', async () => {

    for(let i = 1; i < 11; i++) {
        map.map[2][i] = 11;
    }
    const lines = await map.isLineFormed(new Block(iBlock));
    expect(lines).toBe(0); // Check that lines were indeed formed
  });

  it('should add penality correctly', async () => {
    const penalty = 1;
    const result = await map.addPenality(penalty);
    expect(result).toBe(false); // Assumes penalty addition should return true
  });

  it('should correctly parse the map', () => {
    const stringMap = map.parsed(map.map);
    expect(stringMap).toHaveLength(20); // Check length after parsing
  });
});
