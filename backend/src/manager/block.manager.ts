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

    rotateRight() {
        this.rotation++;
        if (this.rotation === 4)
            this.rotation = 0;
      }

      //peut etres remplacer par un tableau de rotation
      rotateLeft() {
        this.rotation--;
        if (this.rotation === -1)
            this.rotation = 3;
      }
}