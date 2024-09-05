import React from 'react';

const CustomPopup = ({ show }) => {
	
	if (!show) return null;

	return (
		<div className="popup-overlay">
			<div className="popup-content">
				<h2>You lost.. 🙁</h2>
			</div>
		</div>
	);
};

export default CustomPopup;
