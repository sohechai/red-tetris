import { IMap } from "src/interface/map";

export function replaceAllChar(map: IMap): IMap {
    for (let e of "IJLOSTZ0") {
        map = map.map(line => line.replaceAll(e, "."));
    }
    return map;
}