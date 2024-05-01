export function lowercaseArray(strings: string[]): string[] {
    let lowerArray: string[] = strings.map(str => str.toLowerCase());
    console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERE");
    console.log(lowerArray)
    lowerArray = lowerArray.map(str =>str.replaceAll("0", "X").replaceAll("x", "X"));
    return lowerArray;
}