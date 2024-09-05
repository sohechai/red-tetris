import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};

const CustomPopup = ({ show, win }) => {
	
	const { width, height } = useWindowSize();
	
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
