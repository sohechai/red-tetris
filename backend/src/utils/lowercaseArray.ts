export function lowercaseArray(strings: string[]): string[] {
    let lowerArray: string[] = strings.map(str => str.toLowerCase());
    lowerArray = lowerArray.map(str =>str.replaceAll("0", ".").replaceAll("x", "X"));
    return lowerArray;
}