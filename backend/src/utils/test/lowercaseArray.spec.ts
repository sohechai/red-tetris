import { lowercaseArray } from 'src/utils/lowercaseArray';
import { IMap } from 'src/interface/map';

describe('lowercaseArray', () => {
    it('should add 10 to values between 1 and 7', () => {
        const inputMap: IMap = Array.from({ length: 22 }, () => Array(12).fill(0));
        inputMap[0][0] = 1;
        inputMap[0][1] = 5;
        inputMap[0][2] = 7;
        inputMap[0][3] = 8;

        const expectedMap: IMap = Array.from({ length: 22 }, () => Array(12).fill(0));
        expectedMap[0][0] = 11; // 1 + 10
        expectedMap[0][1] = 15; // 5 + 10
        expectedMap[0][2] = 17; // 7 + 10
        expectedMap[0][3] = 8;  // unchanged

        expect(lowercaseArray(inputMap)).toEqual(expectedMap);
    });

    it('should not modify values outside the range of 1 to 7', () => {
        const inputMap: IMap = Array.from({ length: 22 }, () => Array(12).fill(0));
        inputMap[0][0] = 0;
        inputMap[0][1] = 8;
        inputMap[0][2] = 10;
        inputMap[0][3] = 17;

        const expectedMap: IMap = Array.from({ length: 22 }, () => Array(12).fill(0));
        expectedMap[0][0] = 0;  // unchanged
        expectedMap[0][1] = 8;  // unchanged
        expectedMap[0][2] = 10; // unchanged
        expectedMap[0][3] = 17; // unchanged

        expect(lowercaseArray(inputMap)).toEqual(expectedMap);
    });
});