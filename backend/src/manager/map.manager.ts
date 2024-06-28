import { Mutex } from "async-mutex";
import { IBlock } from "src/interface/block";
import { IMap } from "src/interface/map";
import { findCharacter, piecesChar, piecesPlacedChar } from "src/utils/findCharacter";
import { lowercaseArray } from "src/utils/lowercaseArray";
import { replaceAllChar } from "src/utils/replaceAllCharacterOfArray";

export class Map {
    map: IMap;
    specterMap: IMap;
    mutex: Mutex;

    constructor() {
        const newMap: IMap = [];

        for (let i = 0; i < 20; i++) {
            newMap[i] = "X..........X";
        }
        newMap[20] = "XXXXXXXXXXXX";
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

    async blockFall(block: IBlock) {
        const release = await this.mutex.acquire();
        let blockPos: number;
        let newMap: IMap = replaceAllChar(this.map);
        let piecePlaced: boolean = false;
        for (let i = 0; i < 20; i++) {
            if ((blockPos = findCharacter(this.map[i])) !== -1 && !piecePlaced) {
                for (let j = 0; j < block.length; j++) {
                    newMap[i + j + 1] = (this.parseMapLine(newMap[i + 1], block[j], blockPos));
                }
                piecePlaced = true;
            }
            else if (findCharacter(newMap[i]) === -1) {
                newMap[i] = this.map[i];
            }
        }
        if (this.isValidMove(newMap)) {
            this.map = newMap;
        }
        else {
            console.log("error");
            this.map = lowercaseArray(this.map);
        }
        release();
    }

    async movePiece(block: IBlock, move: number) {
        const release = await this.mutex.acquire();
        let blockPos: number;
        let newMap: IMap = replaceAllChar(this.map);
        let piecePlaced: boolean = false;
        for (let i = 0; i < 20; i++) {
            if ((blockPos = findCharacter(this.map[i])) !== -1 && !piecePlaced) {
                for (let j = 0; j < block.length; j++) {
                    newMap[i] = (this.parseMapLine(newMap[i], block[j], blockPos + move));
                    i++;
                }
                piecePlaced = true;
            }
            else if (findCharacter(newMap[i]) === -1) {
                newMap[i] = this.map[i];
            }
        }
        if (this.isValidMove(newMap)) {
            this.map = newMap;
        }
        release();   
    }
    isValidMove(newMap: IMap): boolean {
        console.log("PASSING HERE");
        for (let i = 0; i < 21; i++) {
            console.log(this.map[i], newMap[i]);
            for (let j = 0; j < 12; j++) {
                if (piecesPlacedChar.includes(this.map[i][j]) && piecesChar.includes(newMap[i][j])) {
                    console.log("error");
                    return false;
                }
            }
        }
        return true;
    }

    addFallingBlock(block: IBlock) {
        for (let e in block) {
            const prefix = this.map[e].slice(0, 4);
            const suffix = this.map[e].slice(4 + block[e].length);
            this.map[e] = prefix + block[e] + suffix;
        }
    }

    isBlockFalling(): boolean {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                if ("IJLOSTZ".includes(this.map[i][j]))
                    return true;
            }
        }
        return false;
    }
}