import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'

const CustomPopup = ({ show }) => {

	if (!show) return null;
	const [isVisible, setIsVisible] = useState(false);
	const { width, height } = useWindowSize()



	return (
		<div className="popup-overlay">
			<div className="popup-content">
				<h2>You lost.. 🙁</h2>
			</div>
		</div>
	);
};

export default CustomPopup;
