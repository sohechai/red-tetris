import "./App.css";
import { Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store.jsx";
import Play from "./components/Play.jsx";
import Room from "./components/Room.jsx";
import RoomName from "./components/RoomName.jsx";
import logo from "./assets/tetris-logo.svg";
import { useEffect } from "react";
import Game from "./components/Game.jsx";

function App() {
  // // window.addEventListener("DOMContentLoaded", () => {
  // const blockContainer = document.getElementById("blocks");
  // const blockSize = 50;
  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;
  // const numCols = Math.ceil(screenWidth / blockSize);
  // const numRows = Math.ceil(screenHeight / blockSize);
  // const numBlocks = numCols * numRows;

  // const createBlocks = () => {
  //   for (let i = 0; i < numBlocks; i++) {
  //     const block = document.createElement("div");
  //     block.classList.add("block");
  //     block.dataset.index = i;
  //     block.addEventListener("mousemove", hightlightRandomNeighbors);
  //     blockContainer.appendChild(block);
  //   }
  // };

  // const hightlightRandomNeighbors = () => {
  //   const index = parseInt(this.dataset.index);
  //   const neighbors = [
  //     index - 1,
  //     index + 1,
  //     index - numCols,
  //     index + numCols,
  //     index - numCols - 1,
  //     index - numCols + 1,
  //     index + numCols - 1,
  //     index + numCols + 1,
  //   ].filter(
  //     (i) =>
  //       i >= 0 &&
  //       i < numBlocks &&
  //       Math.abs((i % numCols) - (index % numCols)) <= 1,
  //   );
  //   this.classList.add("highlight");
  //   setTimeout(() => {
  //     this.classList.remove("highlight");
  //   }, 500);

  //   shuffleArray(neighbors)
  //     .slice(0, 1)
  //     .forEach((i) => {
  //       const neighbor = blockContainer.children[i];
  //       if (neighbor) {
  //         neighbor.classList.add("highlight");
  //         setTimeout(() => {
  //           neighbor.classList.remove("highlight");
  //         }, 500);
  //       }
  //     });
  // };

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

  // useEffect(() => {
  //   // createBlocks();
  // }, []);

  return (
    <>
      <BrowserRouter>
        {/* <div className="blocks-container">
          <div id="blocks"> </div>
        </div> */}
        <Routes>
          <Route path="/" exact element={<Play />} />
          <Route path="/room" exact element={<Room />} />
          <Route path="/roomName" exact element={<RoomName />} />
          <Route path="/game" exact element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
