import { IBlock } from "src/interface/block";
import { IMap } from "src/interface/map";
import { findCharacter } from "src/utils/findCharacter";
import { writeCharacter } from "src/utils/writeCharacter";

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

    blockFall(block: IBlock) {
        let BlockPos: number;
        let index: number;
        let blockIndex: number = 0;
        const newMap: IMap = [];

        newMap.push("XXXXXXXXXX");
        for (let e of this.map) {
            index = this.map.indexOf(e);
            if ((BlockPos = findCharacter(e)) !== -1) {
                const prefix = e.slice(0, BlockPos);
                const suffix = e.slice(BlockPos + block[blockIndex].length);
                if (index + 1 < 20) {
                    newMap.push(prefix + block[blockIndex] + suffix);
                    blockIndex++;
                }
            }
            else {
                newMap.push(e);
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