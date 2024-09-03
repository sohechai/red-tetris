// src/components/Game.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Game = () => {
	const map = useSelector(state => state.map);

	// console.log('Map:', map); // Pour le débogage

	return (
		<div className="room-game">
			<div className="game-container">
				{map ? map.map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((cell, cellIndex) => (
							<div key={cellIndex} className={`cell ${cell}`} data-testid={`cell-${cell}`}/>
						))}
					</div>
				)) : null}
			</div>
		</div>
	);
};

export default Game;
