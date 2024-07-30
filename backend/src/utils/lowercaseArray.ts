import { IMap } from "src/interface/map";

export function lowercaseArray(map: IMap): IMap {
    let lowerArray: IMap = [];
    for (let y = 0; y < 21; y ++) {
        lowerArray.push([]);
        for (let x = 0; x < 12; x++) {
            if (map[y][x] > 0 && map[y][x] < 8) {
                lowerArray[y].push(map[y][x] + 10)
            }
            else {
                lowerArray[y].push(map[y][x]);
            }
        }
    }
    return lowerArray;
}