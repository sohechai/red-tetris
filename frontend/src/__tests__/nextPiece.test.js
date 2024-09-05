import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NextP from "../components/NextP"; // Remplace par le chemin correct de ton composant
import {
    I_PIECE,
    J_PIECE,
    L_PIECE,
    O_PIECE,
    S_PIECE,
    T_PIECE,
    Z_PIECE,
} from "../assets/data/tetris-piece.jsx"; // Remplace par le bon chemin

// Mock des pièces pour s'assurer que les tests sont cohérents
jest.mock("../assets/data/tetris-piece.jsx", () => ({
    I_PIECE: [[1, 1, 1, 1], [0, 0, 0, 0]],
    J_PIECE: [[0, 0, 1], [1, 1, 1]],
    L_PIECE: [[1, 1, 1], [1, 0, 0]],
    O_PIECE: [[1, 1], [1, 1]],
    S_PIECE: [[0, 1, 1], [1, 1, 0]],
    T_PIECE: [[0, 1, 0], [1, 1, 1]],
    Z_PIECE: [[1, 1, 0], [0, 1, 1]],
}));

describe("NextP component", () => {
    test("renders the correct piece based on the nextPiece prop", () => {
        // Rendre le composant avec la pièce 'I'
        render(<NextP nextPiece="I" />);
        
        // Vérifier que l'en-tête 'NEXT PIECE' est présent
        expect(screen.getByText(/next piece/i)).toBeInTheDocument();
    });

    test("does not render the piece if nextPiece is not provided", () => {
        // Rendre le composant sans fournir de pièce
        const { container } = render(<NextP nextPiece={null} />);

        // Vérifier que la grille est vide
        const grid = container.querySelector(".nextP-grid");
        expect(grid).toBeEmptyDOMElement();
    });
});
