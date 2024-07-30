import { IBlock } from "src/interface/block";

export class Block {
    block: IBlock;
    position: [number, number];
    constructor(block: IBlock) {
        this.block = block;
        this.position = [0, 5];
    }

    rotateRight() {
        let newBlock: IBlock = new Array(this.block[0].length);

        for (let y = 0; y < newBlock.length; y++) { 
            newBlock[y] = [];
        }
        for(let y = 0; y < this.block.length; y++){
            for(let x = 0; x < this.block[0].length; x++){
       
                newBlock[x][y] = this.block[y][this.block[y].length - 1 - x];
            }
        }
        console.log(newBlock);
        this.block = newBlock;
      }

    // rotateRight(): void {
    //     const n = this.block.length;
    //     const maxLength = Math.max(...this.block.map(str => str.length));
    //     const paddedArray = this.block.map(str => str.padEnd(maxLength, ' '));
    //     const rotatedArray: string[] = [];

    //     for (let i = 0; i < maxLength; i++) {
    //         rotatedArray.push('');
    //     }

    //     for (let i = 0; i < maxLength; i++) {
    //         for (let j = 0; j < n; j++) {
    //             rotatedArray[i] += paddedArray[n - j - 1][i];
    //         }
    //     }
    //     this.block = rotatedArray;
    // }

    // rotateLeft() {
    //     const n = this.block.length;
    //     const maxLength = Math.max(...this.block.map(str => str.length)); // Maximum length of strings

    //     // Padding strings with spaces to ensure they all have the same length
    //     const paddedArray = this.block.map(str => str.padEnd(maxLength, ' '));

    //     const rotatedArray: string[] = [];

    //     for (let i = 0; i < maxLength; i++) {
    //         rotatedArray.push('');
    //     }

    //     for (let i = 0; i < maxLength; i++) {
    //         for (let j = 0; j < n; j++) {
    //             rotatedArray[maxLength - i - 1] += paddedArray[j][i]; // Rotate counterclockwise
    //         }
    //     }

    //     this.block = rotatedArray;
    // }
}