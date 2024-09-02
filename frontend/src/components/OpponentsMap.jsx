import { useDispatch, useSelector } from "react-redux";
import { setupopponentsMapListeners } from "../socketActions";
import { useEffect } from "react";

const OpponentsMap = () => {
	const opponentsGrid = useSelector((state) => state.opponentsMap.opponentsMap);
	const dispatch = useDispatch();

	useEffect(() => {
	}, [opponentsGrid]);

	useEffect(() => {
		dispatch(setupopponentsMapListeners());
	}, []);

	// const grid = pieceMap[type] || [];

	// const opponentsGrid = 
	// [
	//   [
	//     ["X", "X", "X", "T", "T", "T", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "T", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "S"],
	//     ["X", "X", "L", "Z", "X", "X", "J", "J", "J", "S"],
	//     ["L", "L", "L", "Z", "Z", "X", "X", "J", "O", "O"],
	//     ["I", "I", "I", "I", "Z", "X", "X", "J", "O", "O"],
	//   ],
	//   [
	//     ["X", "X", "X", "T", "T", "T", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "T", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "S"],
	//     ["X", "X", "L", "Z", "X", "X", "J", "J", "J", "S"],
	//     ["L", "L", "L", "Z", "Z", "X", "X", "J", "O", "O"],
	//     ["I", "I", "I", "I", "Z", "X", "X", "J", "O", "O"],
	//   ],
	//   [
	//     ["X", "X", "X", "T", "T", "T", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "T", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "S"],
	//     ["X", "X", "L", "Z", "X", "X", "J", "J", "J", "S"],
	//     ["L", "L", "L", "Z", "Z", "X", "X", "J", "O", "O"],
	//     ["I", "I", "I", "I", "Z", "X", "X", "J", "O", "O"],
	//   ],
	//   [
	//     ["X", "X", "X", "T", "T", "T", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "T", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "X"],
	//     ["X", "X", "X", "X", "X", "X", "X", "X", "S", "S"],
	//     ["X", "X", "L", "Z", "X", "X", "J", "J", "J", "S"],
	//     ["L", "L", "L", "Z", "Z", "X", "X", "J", "O", "O"],
	//     ["I", "I", "I", "I", "Z", "X", "X", "J", "O", "O"],
	//   ],
	// ];
	return (
		<div className="room-grid-middle-right-content">
			<div className="opponents-grid">
				{opponentsGrid.map((map, i) => (
					<div className="grid-content" key={i}>
						<p>Opponent {i + 1}</p>
						<div className="opponents-grids" key={i}>
							{map.map((row, rowIndex) => (
								<div key={rowIndex} className="row">
									{row.map((cell, cellIndex) => (
										<div key={cellIndex} className={`cell ${cell}`} />
									))}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OpponentsMap;
