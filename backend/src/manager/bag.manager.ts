import { IBag } from "src/interface/bag";
import { iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock } from "src/model/block";
import { Piece } from "./piece.manager";


export class Bag {
    blocks: IBag;

    constructor() {
        this.blocks = this.createBag();
    }
    //sauvegarder les position dans une autre array qu'y aura la même dimension
    createBag(): IBag {
        const defaultBag: IBag = [
            new Piece(iBlock),
            new Piece(jBlock),
            new Piece(oBlock),
            new Piece(zBlock),
            new Piece(sBlock),
            new Piece(tBlock),
            new Piece(lBlock),
        ];

        return this.ShuffleBag(defaultBag);
    }

    ShuffleBag(bag: IBag): IBag {
        for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }
        return bag;
    }

    AppendBlockToBag() {
        const defaultBag: IBag = [
            new Piece(iBlock),
            new Piece(jBlock),
            new Piece(oBlock),
            new Piece(zBlock),
            new Piece(sBlock),
            new Piece(tBlock),
            new Piece(lBlock),
        ];

        this.blocks = this.blocks.concat(this.ShuffleBag(defaultBag));
    }
}