export function writeCharacter(character: string, count: number): string {
    let result: string = "";
    for (let i = 0; i < count; i++) {
        result += character;
    }
    return result;
}