import { IBlock } from "src/interface/block";
import { IMap } from "src/interface/map";
import { findCharacter } from "src/utils/findCharacter";
import { lowercaseArray } from "src/utils/lowercaseArray";

export class Map {
    map: IMap;
    specterMap: IMap;

    constructor() {
        const newMap: IMap = [];

        for (let i = 0; i < 20; i++) {
            newMap[i] = "XXXXXXXXXX";
        }
        this.map = newMap;
        this.specterMap = newMap;
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

    blockFall(block: IBlock) {
        let blockPos: number;

        let blockIndex: number = 0;
        let newMap: Map = new Map();

        for (let i = 0; i < 20; i++) {
            if ((blockPos = findCharacter(this.map[i])) !== -1) {
                if (i < 20) {
                    newMap.map[i + 1] = (this.parseMapLine(this.map[i + 1], block[blockIndex], blockPos));
                    blockIndex++;
                }
            }
            // else {
            //     console.log("pushed :", e);
            //     newMap.push(e);
            // }
            if (newMap[19] && findCharacter(newMap[19]) !== -1) {
                newMap.map = lowercaseArray(newMap.map);
                break;
            }
        }
        this.map = newMap.map;
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