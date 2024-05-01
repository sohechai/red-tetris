export function findCharacter(str: string): number {
    const characters: string = "IJLOSTZ0";
    for (let i = 0; i < str.length; i++) {
        if (characters.includes(str[i])) {
            return i;
        }
    }
    return -1;
}