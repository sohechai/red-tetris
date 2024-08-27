import { useDispatch, useSelector } from "react-redux";
import {
	I_PIECE,
	J_PIECE,
	L_PIECE,
	O_PIECE,
	S_PIECE,
	T_PIECE,
	Z_PIECE,
} from "../assets/data/tetris-piece.jsx";
import { setupNextPieceListeners } from "../socketActions.jsx";
import { useEffect } from "react";

const pieceMap = {
	I: I_PIECE,
	J: J_PIECE,
	L: L_PIECE,
	O: O_PIECE,
	S: S_PIECE,
	T: T_PIECE,
	Z: Z_PIECE,
};

const NextP = ({ type }) => {
	const nextPiece = useSelector((state) => state.nextPiece.nextPiece);
	const dispatch = useDispatch();

	useEffect(() => {
	}, [nextPiece]);
	useEffect(() => {
		dispatch(setupNextPieceListeners());
	}, []);
	const grid = pieceMap[type] || [];

	const numRows = grid.length;
	const numCols = grid[0]?.length || 0;

	return (
		<div className="room-grid-middle-right-header">
			<div
				className="nextP-grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${numCols}, 30px)`,
					gridTemplateRows: `repeat(${numRows}, 30px)`,
				}}
			>
				{pieceMap[nextPiece] ? pieceMap[nextPiece].map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((cell, cellIndex) => (
							<div key={cellIndex} className={`next-cell ${cell}`} />
						))}
					</div>
				)) : null}
			</div>
		</div>
	);
};

export default NextP;
