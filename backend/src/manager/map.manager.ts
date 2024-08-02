import { Mutex } from 'async-mutex';
import { IMap } from 'src/interface/map';
import { lowercaseArray } from 'src/utils/lowercaseArray';
import { replaceAllChar } from 'src/utils/replaceAllCharacterOfArray';
import { Block, rotateLeft, rotateRight } from './block.manager';
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

  async blockFall(block: Block) {
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
  async dropOne(block: Block, client: Socket, server: Server) {
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

  async dropPiece(block: Block, client: Socket, server: Server) {
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

  async rotatePiece(block: Block, client: Socket, server: Server) {
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
  async movePiece(block: Block, move: number, client: Socket, server: Server) {
    const release = await this.mutex.acquire();
    if (this.isBlockFalling()) {
      block.position[1] += move;
      //   this.logMap(this.map);
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
  logMap(map: IMap) {
    console.log('____________________________');
    for (let y = 0; y < 22; y++) {
      console.log();
      for (let x = 0; x < 12; x++) {
        if (map[y][x] === 10) {
          process.stdout.write('X');
        } else if (map[y][x] === 11) {
          process.stdout.write('I');
        } else if (map[y][x] === 12) {
          process.stdout.write('L');
        } else if (map[y][x] === 13) {
          process.stdout.write('J');
        } else if (map[y][x] === 14) {
          process.stdout.write('O');
        } else if (map[y][x] === 15) {
          process.stdout.write('S');
        } else if (map[y][x] === 16) {
          process.stdout.write('T');
        } else if (map[y][x] === 17) {
          process.stdout.write('Z');
        } else {
          process.stdout.write(map[y][x].toString());
        }
      }
    }
  }
  isValidMove(newMap: IMap): boolean {
    // console.log("NEW MAP");
    // this.logMap(newMap);
    // console.log("OLD MAP");
    // this.logMap(this.map);
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
  async addFallingBlock(block: Block) {
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

  isLineFormed(block: Block): number {
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
    if (lineFormed) {
      this.map = replaceAllChar(this.map);
      console.log(block.position[0], block.position[1]);
      for (let y = 0; y < block.block[block.rotation].length; y++) {
        for (let x = 0; x < block.block[block.rotation][y].length; x++) {
          if (block.block[block.rotation][y][x] !== 0)
            this.map[y + block.position[0]][x + block.position[1]] =
              block.block[block.rotation][y][x];
        }
      }
    }
    return lineFormed - 1;
  }

  addPenality(penality: number): boolean {
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
    for (let y = 1; y < 21; y++) {
      stringMap.push([]);
      for (let x = 1; x < 11; x++) {
        if (map[y][x] === 10 || map[y][x] === 0) {
          stringMap[y - 1].push('X');
        } else if (map[y][x] === 11) {
          stringMap[y - 1].push('I');
        } else if (map[y][x] === 12) {
          stringMap[y - 1].push('L');
        } else if (map[y][x] === 13) {
          stringMap[y - 1].push('J');
        } else if (map[y][x] === 14) {
          stringMap[y - 1].push('O');
        } else if (map[y][x] === 15) {
          stringMap[y - 1].push('S');
        } else if (map[y][x] === 16) {
          stringMap[y - 1].push('T');
        } else if (map[y][x] === 17) {
          stringMap[y - 1].push('Z');
        } else if (map[y][x] === 0) {
          stringMap[y - 1].push('X');
        } else if (map[y][x] === 1) {
          stringMap[y - 1].push('I');
        } else if (map[y][x] === 2) {
          stringMap[y - 1].push('L');
        } else if (map[y][x] === 3) {
          stringMap[y - 1].push('J');
        } else if (map[y][x] === 4) {
          stringMap[y - 1].push('O');
        } else if (map[y][x] === 5) {
          stringMap[y - 1].push('S');
        } else if (map[y][x] === 6) {
          stringMap[y - 1].push('T');
        } else if (map[y][x] === 7) {
          stringMap[y - 1].push('Z');
        }
      }
    }
    return stringMap;
  }
}
