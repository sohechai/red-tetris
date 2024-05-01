import { IMap } from "src/interface/map";

export function replaceAllChar(map: IMap): IMap {
    for (let e of "IJLOSTZ0") {
        console.log(e);
        map = map.map(line => line.replaceAll(e, "."));
    }
    console.log(map);
    return map;
}