import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const CustomPopup = ({ show, win, width, height }) => {
	if (!show) return null;

	return (
		<div className="popup-overlay">
			<div className="popup-content">
				{win ? (
					<>
						<h2>You won! 🎊</h2>
						<Confetti width={width} height={height} />
					</>
				) : (
					<h2>You lost.. 🙁</h2>
				)}
			</div>
		</div>
	);
};

export default CustomPopup;
