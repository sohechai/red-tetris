import { fireEvent } from "@testing-library/react";
import { MoveRight, MoveLeft, Rotate, dropPiece, FallByOne } from "../socketActions"; // Replace with actual action import paths
import { handleKeyPress } from "../components/RoomName"; // Adjust the import path accordingly
import "@testing-library/jest-dom"

jest.mock("../socketActions", () => ({
  MoveRight: jest.fn(),
  MoveLeft: jest.fn(),
  Rotate: jest.fn(),
  dropPiece: jest.fn(),
  FallByOne: jest.fn(),
}));

describe("handleKeyPress", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn(); // Mock the dispatch function
  });

  it("should call MoveRight when ArrowRight is pressed", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    fireEvent.keyDown(document, event);

    handleKeyPress(event, dispatch);
    expect(dispatch).toHaveBeenCalledWith(MoveRight());
  });

  it("should call MoveLeft when ArrowLeft is pressed", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    fireEvent.keyDown(document, event);

    handleKeyPress(event, dispatch);
    expect(dispatch).toHaveBeenCalledWith(MoveLeft());
  });

  it("should call Rotate when ArrowUp is pressed", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    fireEvent.keyDown(document, event);

    handleKeyPress(event, dispatch);
    expect(dispatch).toHaveBeenCalledWith(Rotate());
  });

  it("should call dropPiece when Spacebar is pressed", () => {
    const event = new KeyboardEvent("keydown", { key: " " });
    fireEvent.keyDown(document, event);

    handleKeyPress(event, dispatch);
    expect(dispatch).toHaveBeenCalledWith(dropPiece());
  });

  it("should call FallByOne when ArrowDown is pressed", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    fireEvent.keyDown(document, event);

    handleKeyPress(event, dispatch);
    expect(dispatch).toHaveBeenCalledWith(FallByOne());
  });

  it("should not prevent default behavior when input or textarea is focused", () => {
    document.body.innerHTML = `<input type="text" />`; // Simulate an input element
    const input = document.querySelector("input");
    input.focus();

    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    fireEvent.keyDown(input, event);

    handleKeyPress(event, dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it("should prevent default behavior when an arrow key or space is pressed and no input or textarea is focused", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    fireEvent.keyDown(document, event);

    handleKeyPress(event, dispatch);
    expect(event.defaultPrevented).toBe(false);
  });
});
