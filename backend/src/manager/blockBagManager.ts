import { Bag } from "src/interface/bag";
import { iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock } from "src/model/piece";


function ShuffleBag(bag: Bag): Bag {
    for (let i = bag.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [bag[i], bag[j]] = [bag[j], bag[i]]; 
    }
    return bag;
}

export function GenerateNewBag(): Bag {
    const defaultBag: Bag = [
        iBlock,
        jBlock,
        oBlock,
        zBlock,
        sBlock,
        tBlock,
        lBlock,
    ];

    return ShuffleBag(defaultBag); 
}

export function AppendBlockToBag(bag: Bag): Bag {
    const defaultBag: Bag = [
        iBlock,
        jBlock,
        oBlock,
        zBlock,
        sBlock,
        tBlock,
        lBlock,
    ];

    bag = bag.concat(ShuffleBag(defaultBag));
    return bag;
}