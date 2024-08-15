import { IMap } from "src/interface/map";

export function replaceAllChar(map: IMap): IMap {
    let newMap: IMap = [];
    for (let y = 0; y < 22; y++) {
        newMap.push([]);
        for (let x = 0; x < 12; x++) {
            if (map[y][x] < 8 && map[y][x] > 0)
                newMap[y].push(0);
            else
                newMap[y].push(map[y][x]);
        }
    }
    return newMap;
}