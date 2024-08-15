import { IBlock } from "src/interface/block";

export class Block {
    block: IBlock;
    rotation: number;
    position: [number, number];
    constructor(block: IBlock) {
        this.block = block;
        this.position = [0, 5];
        this.rotation = 0;
    }

}
export function rotateRight(block: Block) {
    block.rotation++;
    if (block.rotation === 4)
        block.rotation = 0;
  }

  //peut etres remplacer par un tableau de rotation
  export function rotateLeft(block: Block) {
    block.rotation--;
    if (block.rotation === -1)
        block.rotation = 3;
  }