import { Mutex } from 'async-mutex';
import { IMap } from 'src/interface/map';
import { lowercaseArray } from 'src/utils/lowercaseArray';
import { replaceAllChar } from 'src/utils/replaceAllCharacterOfArray';
import { Piece, rotateLeft, rotateRight } from './piece.manager';
import { findCharacter } from 'src/utils/findCharacter';
import { Server, Socket } from 'socket.io';

export class Map {
  map: IMap;
  specterMap: IMap;
  mutex: Mutex;

  constructor() {
    const newMap: IMap = [];

    for (let y = 0; y < 22; y++) {
      newMap.push([]);
      for (let x = 0; x < 12; x++) {
        if (x === 0 || x === 11 || y == 21) {
          newMap[y].push(10);
        } else {
          newMap[y].push(0);
        }
      }
    }
    this.map = newMap;
    this.specterMap = newMap;
    this.mutex = new Mutex();
  }

  async blockFall(block: Piece) {
    const release = await this.mutex.acquire();
    let newMap: IMap = replaceAllChar(this.map);
    block.position[0] += 1;
    for (let y = 0; y < block.block[block.rotation].length; y++) {
      for (let x = 0; x < block.block[block.rotation][y].length; x++) {
        if (block.block[block.rotation][y][x] !== 0)
          newMap[y + block.position[0]][x + block.position[1]] =
            block.block[block.rotation][y][x];
      }
    }
    if (this.isValidMove(newMap)) {
      this.map = newMap;
    } else {
      this.map = lowercaseArray(this.map);
    }
    release();
  }
  //DELETE PLUS TARD POUR UTILISER BLOCKFALL
  async dropOne(block: Piece, client: Socket, server: Server) {
    const release = await this.mutex.acquire();
    if (this.isBlockFalling()) {
      let newMap: IMap = replaceAllChar(this.map);
      block.position[0] += 1;
      for (let y = 0; y < block.block[block.rotation].length; y++) {
        for (let x = 0; x < block.block[block.rotation][y].length; x++) {
          if (block.block[block.rotation][y][x] !== 0)
            newMap[y + block.position[0]][x + block.position[1]] =
              block.block[block.rotation][y][x];
        }
      }
      if (this.isValidMove(newMap)) {
        this.map = newMap;
        server.to(client.id).emit('map', this.parsed(newMap));
      } else {
        block.position[0] -= 1;
        this.map = lowercaseArray(this.map);
      }
    }
    release();
  }

  async dropPiece(block: Piece, client: Socket, server: Server) {
    //BUG PRESS DROP ET MOVE
    const release = await this.mutex.acquire();
    if (this.isBlockFalling()) {
      let i = 0;
      while (this.isBlockFalling() && i < 22) {
        i++;
        let newMap: IMap = replaceAllChar(this.map);
        block.position[0] += 1;
        for (let y = 0; y < block.block[block.rotation].length; y++) {
          for (let x = 0; x < block.block[block.rotation][y].length; x++) {
            if (block.block[block.rotation][y][x] !== 0)
              newMap[y + block.position[0]][x + block.position[1]] =
                block.block[block.rotation][y][x];
          }
        }
        if (this.isValidMove(newMap)) {
          this.map = newMap;
          server.to(client.id).emit('map', this.parsed(newMap));
        } else {
          block.position[0] -= 1;
          this.map = lowercaseArray(this.map);
        }
      }
    }
    release();
  }

  async rotatePiece(block: Piece, client: Socket, server: Server) {
    const release = await this.mutex.acquire();
    if (this.isBlockFalling()) {
      let newMap: IMap = replaceAllChar(this.map);
      rotateRight(block);
      for (let y = 0; y < block.block[block.rotation].length; y++) {
        for (let x = 0; x < block.block[block.rotation][y].length; x++) {
          if (block.block[block.rotation][y][x] !== 0)
            newMap[y + block.position[0]][x + block.position[1]] =
              block.block[block.rotation][y][x];
        }
      }
      if (this.isValidMove(newMap)) {
        this.map = newMap;
        server.to(client.id).emit('map', this.parsed(newMap));
      } else {
        rotateLeft(block);
      }
    }
    release();
  }
  async movePiece(block: Piece, move: number, client: Socket, server: Server) {
    const release = await this.mutex.acquire();
    if (this.isBlockFalling()) {
      block.position[1] += move;
      let newMap: IMap = replaceAllChar(this.map);
      for (let y = 0; y < block.block[block.rotation].length; y++) {
        for (let x = 0; x < block.block[block.rotation][y].length; x++) {
          if (block.block[block.rotation][y][x] != 0)
            newMap[y + block.position[0]][x + block.position[1]] =
              block.block[block.rotation][y][x];
        }
      }
      if (this.isValidMove(newMap)) {
        this.map = newMap;
        server.to(client.id).emit('map', this.parsed(newMap));
      } else {
        block.position[1] -= move;
      }
    }
    release();
  }
  isValidMove(newMap: IMap): boolean {
    for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 12; x++) {
        if (
          this.map[y][x] > 9 &&
          this.map[y][x] < 18 &&
          newMap[y][x] > 0 &&
          newMap[y][x] < 8
        ) {
          return false;
        }
      }
    }
    return true;
  }

  // verifier que la piece est posable
  async addFallingBlock(block: Piece) {
    const release = await this.mutex.acquire();
    let newMap: IMap = replaceAllChar(this.map);
    for (let y = 0; y < block.block[block.rotation].length; y++) {
      for (let x = 0; x < block.block[block.rotation][y].length; x++) {
        if (block.block[block.rotation][y][x] !== 0)
          newMap[y + block.position[0]][x + block.position[1]] =
            block.block[block.rotation][y][x];
      }
    }
    if (this.isValidMove(newMap)) {
      this.map = newMap;
    } else {
      release();
      return true;
    }
    release();
    return false;
  }

  isBlockFalling(): boolean {
    for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 12; x++) {
        if (this.map[y][x] > 0 && this.map[y][x] < 8) return true;
      }
    }
    return false;
  }

  async isLineFormed(block: Piece): Promise<number> {
    let release = await this.mutex.acquire();
    let lineFormed: number = 0;
    let count: number = 0;
    let indexOfLine: number[] = [];
    for (let y = 0; y < 22; y++) {
      count = 0;
      for (let x = 0; x < 12; x++) {
        if (this.map[y][x] < 18 && this.map[y][x] > 10) {
          count++;
          if (count == 10) {
            lineFormed++;
            indexOfLine.push(y);
          }
        }
      }
    }
    for (let index of indexOfLine) {
      this.map.splice(index, 1);
      this.map.unshift([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]);
    }
    release();
    return lineFormed - 1;
  }

  async addPenality(penality: number): Promise<boolean> {
    for (let y = 0; y < penality; y++) {
      if (findCharacter(this.map[0])) {
        return true;
      }
      this.map.splice(0, 1);
      this.map.push([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    }
    return false;
  }

  parsed(map: IMap): string[][] {
    const stringMap: string[][] = [];
    const parse = ["X", "I", "L", "J", "O", "S", "T", "Z", "", "", "P", "I", "L", "J", "O", "S", "T", "Z"]
    for (let y = 1; y < 21; y++) {
      stringMap.push([]);
      for (let x = 1; x < 11; x++) {
        stringMap[y - 1].push(parse[map[y][x]]);
      }
    }
    console.log(stringMap);
    return stringMap;
  }
}
