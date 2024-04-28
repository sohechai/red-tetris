import  { Map }  from 'src/interface/map';

export function generateNewMap(): Map {
    const map: Map = [];

    for (let i: number; i < 20; i++) {
        map[i] = "XXXXXXXXXX";
    }
    return map;
}