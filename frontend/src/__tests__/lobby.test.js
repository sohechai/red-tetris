import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Lobby from "../components/Lobby"; // Adjust the path based on your file structure

describe("Lobby Component", () => {
  it("displays the correct number of users in the header", () => {
    const mockUsers = [
      { pseudo: "Alice", owner: true, score: 10 },
      { pseudo: "Bob", owner: false, score: 15 },
    ];

    render(<Lobby users={mockUsers} />);

    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("renders user information correctly", () => {
    const mockUsers = [
      { pseudo: "Alice", owner: true, score: 10 },
      { pseudo: "Bob", owner: false, score: 15 },
    ];

    render(<Lobby users={mockUsers} />);

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.pseudo)).toBeInTheDocument();
      expect(screen.getByText(`score : ${user.score}`)).toBeInTheDocument();

      const circle = screen.getByText(user.pseudo).nextSibling;
      if (user.owner) {
        expect(circle).toHaveClass("score");
        expect(circle).not.toHaveStyle("background: transparent");
      }
    });
  });
});
