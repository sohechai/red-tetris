import React from "react";
import { render, screen } from "@testing-library/react";
import OpponentsMap from "../components/OpponentsMap"; // Remplace par le chemin correct vers ton composant
import "@testing-library/jest-dom";

describe("OpponentsMap component", () => {
    const mockOpponentsGrid = [
        {
            pseudo: "Player1",
            map: [
                ["filled", "empty", "empty"],
                ["empty", "filled", "empty"],
                ["empty", "empty", "filled"],
            ],
        },
        {
            pseudo: "Player2",
            map: [
                ["empty", "filled", "empty"],
                ["filled", "empty", "empty"],
                ["empty", "empty", "filled"],
            ],
        },
    ];

    test("renders opponents' grids correctly", () => {
        // Rendre le composant avec les données mockées
        render(<OpponentsMap opponentsGrid={mockOpponentsGrid} />);

        // Vérifier que les pseudos des joueurs sont affichés
        expect(screen.getByText("Player1")).toBeInTheDocument();
        expect(screen.getByText("Player2")).toBeInTheDocument();

        // Vérifier que la première grille est correctement rendue (Player1)
        const player1Grid = screen.getByText("Player1").nextSibling;
        const player1Cells = player1Grid.querySelectorAll(".cell");

        expect(player1Cells.length).toBe(9); // 3 lignes * 3 colonnes = 9 cellules

        // Vérifier que les classes des cellules correspondent
        expect(player1Cells[0]).toHaveClass("cell filled");
        expect(player1Cells[1]).toHaveClass("cell empty");
        expect(player1Cells[2]).toHaveClass("cell empty");
        expect(player1Cells[3]).toHaveClass("cell empty");
        expect(player1Cells[4]).toHaveClass("cell filled");
        expect(player1Cells[5]).toHaveClass("cell empty");
        expect(player1Cells[6]).toHaveClass("cell empty");
        expect(player1Cells[7]).toHaveClass("cell empty");
        expect(player1Cells[8]).toHaveClass("cell filled");

        // Vérifier que la deuxième grille est correctement rendue (Player2)
        const player2Grid = screen.getByText("Player2").nextSibling;
        const player2Cells = player2Grid.querySelectorAll(".cell");

        expect(player2Cells.length).toBe(9); // 3 lignes * 3 colonnes = 9 cellules

        // Vérifier les classes des cellules pour Player2
        expect(player2Cells[0]).toHaveClass("cell empty");
        expect(player2Cells[1]).toHaveClass("cell filled");
        expect(player2Cells[2]).toHaveClass("cell empty");
        expect(player2Cells[3]).toHaveClass("cell filled");
        expect(player2Cells[4]).toHaveClass("cell empty");
        expect(player2Cells[5]).toHaveClass("cell empty");
        expect(player2Cells[6]).toHaveClass("cell empty");
        expect(player2Cells[7]).toHaveClass("cell empty");
        expect(player2Cells[8]).toHaveClass("cell filled");
    });

    test("renders nothing if opponentsGrid is empty", () => {
        // Rendre le composant avec une liste vide
        const { container } = render(<OpponentsMap opponentsGrid={[]} />);

        // Vérifier qu'aucune grille n'est rendue
        const opponentsGrid = container.querySelector(".opponents-grid");
        expect(opponentsGrid).toBeEmptyDOMElement();
    });
});
