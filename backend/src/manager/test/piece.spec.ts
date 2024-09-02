import { Piece, rotateRight, rotateLeft } from 'src/manager/piece.manager';
import { iBlock } from 'src/model/block';


describe('Block', () => {
  let block: Piece;

  beforeEach(() => {
    block = new Piece(iBlock);
  });

  it('should initialize with default values', () => {
    expect(block.position).toEqual([0, 5]);
    expect(block.rotation).toBe(0);
  });

  it('should rotate right correctly', () => {
    rotateRight(block);
    expect(block.rotation).toBe(1);

    rotateRight(block);
    expect(block.rotation).toBe(2);

    rotateRight(block);
    expect(block.rotation).toBe(3);

    rotateRight(block);
    expect(block.rotation).toBe(0); // Rotation should wrap around to 0
  });

  it('should rotate left correctly', () => {
    rotateLeft(block);
    expect(block.rotation).toBe(3); // Should be 3 after rotating left from 0

    rotateLeft(block);
    expect(block.rotation).toBe(2);

    rotateLeft(block);
    expect(block.rotation).toBe(1);

    rotateLeft(block);
    expect(block.rotation).toBe(0); // Rotation should wrap around to 0
  });
});