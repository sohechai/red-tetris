import { IBlock } from "src/interface/block";
import { IMap } from "src/interface/map";
import { findCharacter } from "src/utils/findCharacter";
import { lowercaseArray } from "src/utils/lowercaseArray";
import { replaceAllChar } from "src/utils/replaceAllCharacterOfArray";

export class Map {
    map: IMap;
    specterMap: IMap;

    constructor() {
        const newMap: IMap = [];

        for (let i = 0; i < 20; i++) {
            newMap[i] = "..........";
        }
        this.map = newMap;
        this.specterMap = newMap;
    }

    parseMapLine(line: string, block: string, blockPos: number): string {
        console.log("LENGTH OF I: ", block.length);
        const prefix = line.slice(0, blockPos);
        const suffix = line.slice(blockPos + block.length);
        console.log("OLD LINE:", line);
        console.log("NEW LINE: ", prefix + block + suffix);
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

    blockFall(block: IBlock) {
        let blockPos: number;
        let newMap: IMap = replaceAllChar(this.map);
        let pieceCopied: boolean = false;
        for (let i = 0; i < 20; i++) {
            console.log("Block lenght: ", block.length);
            if (newMap[19] && findCharacter(newMap[19]) !== -1) {
                newMap = lowercaseArray(newMap);
                break;
            }
            if (pieceCopied)
                break;
            if ((blockPos = findCharacter(this.map[i])) !== -1) {
                if (i < 20) {
                    for (let j = 0; j < block.length; j++) {
                        newMap[i + j + 1] = (this.parseMapLine(newMap[i + 1], block[j], blockPos));
                    }
                    pieceCopied = true;
                }
            } 
        }
        this.map = newMap;
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