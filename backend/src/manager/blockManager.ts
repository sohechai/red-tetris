import { IBlock } from "src/interface/block";

export class Block {
    block: IBlock;
    character: string;

    constructor(block: IBlock) {
        this.block = block;
    }
    rotateBlockRight(): void {
        const n = this.block.length;
        const maxLength = Math.max(...this.block.map(str => str.length));
        const paddedArray = this.block.map(str => str.padEnd(maxLength, ' '));
        const rotatedArray: string[] = [];

        for (let i = 0; i < maxLength; i++) {
            rotatedArray.push('');
        }

        for (let i = 0; i < maxLength; i++) {
            for (let j = 0; j < n; j++) {
                rotatedArray[i] += paddedArray[n - j - 1][i];
            }
        }
        this.block = rotatedArray;
    }

    rotateBlockLeft() {
        const n = this.block.length;
        const maxLength = Math.max(...this.block.map(str => str.length)); // Maximum length of strings

        // Padding strings with spaces to ensure they all have the same length
        const paddedArray = this.block.map(str => str.padEnd(maxLength, ' '));

        const rotatedArray: string[] = [];

        for (let i = 0; i < maxLength; i++) {
            rotatedArray.push('');
        }

        for (let i = 0; i < maxLength; i++) {
            for (let j = 0; j < n; j++) {
                rotatedArray[maxLength - i - 1] += paddedArray[j][i]; // Rotate counterclockwise
            }
        }

        this.block =  rotatedArray;
    }
}