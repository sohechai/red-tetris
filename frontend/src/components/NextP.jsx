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

	useEffect(() => { }, [nextPiece]);

	useEffect(() => {
		dispatch(setupNextPieceListeners());
	}, [dispatch]);

	const grid = pieceMap[type] || [];

	return (
		<>
			<div className="room-grid-middle-right-header">
				<h1 className="nextP-header">NEXT PIECE</h1>
				<div className="nextP-container">
					<div
						className="nextP-grid"
						style={{
							display: "grid",
							gridTemplateColumns: `repeat(4, 30px)`,
							gridTemplateRows: `repeat(2, 30px)`,
						}}
					>
						{grid.map((row, rowIndex) => (
							<div key={rowIndex} className="row">
								{row.map((cell, cellIndex) => (
									<div
										key={cellIndex}
										className={`next-cell ${cell}`}
										data-testid={`cell-${rowIndex}-${cellIndex}`}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default NextP;
