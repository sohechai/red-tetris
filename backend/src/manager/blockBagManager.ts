import { IBag } from "src/interface/bag";
import { iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock } from "src/model/block";
import { Block } from "./blockManager";


export class Bag {
    blocks: IBag;
    constructor() {
        this.blocks = this.createBag();
    }
    //sauvegarder les position dans une autre array qu'y aura la même dimension
    createBag(): IBag {
        const defaultBag: IBag = [
            new Block(iBlock),
            new Block(jBlock),
            new Block(oBlock),
            new Block(zBlock),
            new Block(sBlock),
            new Block(tBlock),
            new Block(lBlock),
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
            new Block(iBlock),
            new Block(jBlock),
            new Block(oBlock),
            new Block(zBlock),
            new Block(sBlock),
            new Block(tBlock),
            new Block(lBlock),
        ];

        this.blocks = this.blocks.concat(this.ShuffleBag(defaultBag));
    }
}