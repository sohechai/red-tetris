import React, { useEffect, useState } from 'react';

const LoadingPage = () => {
	const [startAnimation, setStartAnimation] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setStartAnimation(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`loading-page ${startAnimation ? 'animate' : ''}`}>
			{!startAnimation && <div className="loading-text">
				<div className="loading-bar"></div>
				<span className="word">LOADING</span>
				<span className="word">PLS</span>
				<span className="word">WAIT</span>
			</div>
			}
		</div>
	);
};

export default LoadingPage;
