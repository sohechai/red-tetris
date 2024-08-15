export function findCharacter(line: number[]): boolean {
    for (let i = 0; i < line.length; i++) {
        if (line[i] < 18 && line[i] > 10) {
            return true;
        }
    }
    return false;
}

export const piecesChar = "IJLOSTZ";
export const piecesPlacedChar = "ijklostzX";