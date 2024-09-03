import { Bag } from 'src/manager/bag.manager';
import { Piece } from 'src/manager/piece.manager';
import { iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock } from 'src/model/block';
import { IBag } from 'src/interface/bag';

describe('Bag', () => {
  let bag: Bag;

  beforeEach(() => {
    bag = new Bag();
  });

  it('should create a bag with shuffled blocks', () => {
    expect(bag.blocks.length).toBe(7);
    // Check that the blocks are instances of Block
    bag.blocks.forEach(block => {
      expect(block).toBeInstanceOf(Piece);
    });
    // Check if the bag is shuffled
    const originalBlocks = [...bag.blocks];
    bag.AppendBlockToBag();
    expect(bag.blocks.length).toBe(14); // Check the length after appending
  });

  it('should append blocks to the bag', () => {
    const initialLength = bag.blocks.length;
    bag.AppendBlockToBag();
    expect(bag.blocks.length).toBe(initialLength + 7);
  });

  it('should shuffle the bag correctly', () => {
    const originalBag = [...bag.blocks];
    const shuffledBag = bag.ShuffleBag([...originalBag]);
    expect(shuffledBag).not.toEqual(originalBag);
  });
});