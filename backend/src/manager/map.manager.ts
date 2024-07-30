import { Mutex } from "async-mutex";
import { IMap } from "src/interface/map";
import { lowercaseArray } from "src/utils/lowercaseArray";
import { replaceAllChar } from "src/utils/replaceAllCharacterOfArray";
import { Block } from "./block.manager";
import { findCharacter } from "src/utils/findCharacter";

export class Map {
    map: IMap;
    specterMap: IMap;
    mutex: Mutex;

    constructor() {
        const newMap: IMap = [];

        for (let y = 0; y < 22; y++) {
            newMap.push([]);
            for (let x = 0; x < 12; x++)
            {
                if (x === 0 || x === 11 || y == 21) {
                    newMap[y].push(10);
                }
                else {
                    newMap[y].push(0);
                }
            }
        }
        this.map = newMap;
        this.specterMap = newMap;
        this.mutex = new Mutex();
    }

    parseMapLine(line: string, block: string, blockPos: number): string {
        const prefix = line.slice(0, blockPos);
        const suffix = line.slice(blockPos + block.length);
        return prefix + block + suffix;
    }

    isNotAtBottomOfMap(index: number, offset: number): boolean {
        if (index + offset < 20)
            return true;
        return false;
    }

    copyMap(cpyMap: IMap) {
        for (let i = 0; i < 20; i++) {
            this.map[i] = cpyMap[i];
        }
    }

    async blockFall(block: Block) {
        const release = await this.mutex.acquire();
        let newMap: IMap = replaceAllChar(this.map);
        block.position[0] += 1;
        for (let y = 0; y < block.block.length; y++) {
            for (let x = 0; x < block.block[y].length; x++) {
                if (block.block[y][x] !== 0)
                    newMap[y + block.position[0]][x + block.position[1]] = block.block[y][x];
            }
        }
        if (this.isValidMove(newMap)) {
            this.map = newMap;
        }
        else {
            block.position[0] -= 1;
            this.map = lowercaseArray(this.map);
        }
        release();
    }

    async rotatePiece(block: Block) {
        const release = await this.mutex.acquire();
        let newMap: IMap = replaceAllChar(this.map);
        block.rotateRight();
        for (let y = 0; y < block.block.length; y++) {
            for (let x = 0; x < block.block[y].length; x++) {
                if (block.block[y][x] !== 0)
                    newMap[y + block.position[0]][x + block.position[1]] = block.block[y][x];
            }
        }
        this.map = newMap;
        release(); 
    }
    async movePiece(block: Block, move: number) {
        const release = await this.mutex.acquire();
        block.position[1] += move;
        let newMap: IMap = replaceAllChar(this.map);
        for (let y = 0; y < block.block.length; y++) {
                for (let x = 0; x < block.block[y].length; x++) {
                    if (block.block[y][x] != 0)
                        newMap[y + block.position[0]][x + block.position[1]] = block.block[y][x];
                }
            }
        if (this.isValidMove(newMap)) {
            this.map = newMap;
        }
        else {
            block.position[1] -= move;
        }
        release();   
    }
    logMap(map: IMap)
    {
        console.log("____________________________");
        for (let y = 0; y < 22; y ++) {
            for (let x = 0; x < 12; x++) {
                if (map[y][x] === 10) {
                    process.stdout.write('X');
                }
                else if (map[y][x] === 11) {
                    process.stdout.write('I');
                }
                else if (map[y][x] === 12) {
                    process.stdout.write('L');
                }
                else if (map[y][x] === 13) {
                    process.stdout.write('J');
                }
                else if (map[y][x] === 14) {
                    process.stdout.write('O');
                }
                else if (map[y][x] === 15) {
                    process.stdout.write('S');
                }
                else if (map[y][x] === 16) {
                    process.stdout.write('T');
                }
                else if (map[y][x] === 17) {
                    process.stdout.write('Z');
                }
                else {
                    process.stdout.write(map[y][x].toString());
                }
            }
            console.log();
        }
    }
    isValidMove(newMap: IMap): boolean {
        // console.log("NEW MAP");
        // this.logMap(newMap);
        // console.log("OLD MAP");
        // this.logMap(this.map);
        for (let y = 0; y < 22; y++) {
            for (let x = 0; x < 12; x++) {
                if (newMap[y][x] < 8 && newMap[y][x] > 0)
                    console.log(this.map[y][x], " ", newMap[y][x]);
                if (this.map[y][x] > 9 && this.map[y][x] < 18 && newMap[y][x] > 0 && newMap[y][x] < 8) {
                    console.log("here");
                    return false;
                }
            }
        }
        return true;
    }

    // verifier que la piece est posable
    addFallingBlock(block: Block) {
        for (let y = 0; y < block.block.length; y++) {
            for (let x = 0; x < block.block[y].length; x++) {
                this.map[y + block.position[0]][x + block.position[1]] = block.block[y][x];
            }
        }
    }

    isBlockFalling(): boolean {
        for (let y = 0; y < 22; y++) {
            for (let x = 0; x < 12; x++) {
                if (this.map[y][x] > 0 && this.map[y][x] < 8)
                    return true;
            }
        }
        return false;
    }

    isLineFormed(): number {
        let lineFormed: number = 0;
        let count: number = 0;
        let indexOfLine: number[] = [];
        for (let y = 0; y < 22; y++) {
            for (let x = 0; x < 12; x++) {
                if (this.map[y][x] < 18 && this.map[y][x] > 10) {
                    count++;
                    if (count == 10) {
                        lineFormed++;
                        indexOfLine.push(y);
                    }
                }
                else {
                    count = 0;
                }
            }
        }
        for (let index of indexOfLine) {
            this.map.unshift([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]);
            this.map.splice(index, 1);
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
        for (let y = 0; y < penality; y++) { 
            
        }
        return false;
    }
}