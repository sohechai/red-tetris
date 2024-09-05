import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAudio } from "../utils/AudioContext";
import CustomPopup from "../utils/WinPopUp.jsx";

const Settings = ( { me, win, isGameEnded }) => {
	const [isGameLaunched, setIsGameLaunched] = useState(false);
	const { playSound } = useAudio();
	const [showPopup, setShowPopup] = useState(false);
	const dispatch = useDispatch();

	const handleMouseOver = () => {
		playSound('/sound/button_hover_sound.wav');
	};

	const launchGame = (e) => {
		e.preventDefault();
		dispatch(startGame());
		setIsGameLaunched(true);
	};

	useEffect(() => {
		if (isGameEnded) {
			setIsGameLaunched(false);
			setShowPopup(true);
			const timer = setTimeout(() => {
				setShowPopup(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isGameEnded, win])



	return (
		<div className="room-settings">
			<h1 className="h1-header">START GAME</h1>
			<CustomPopup show={showPopup} win={win} />
			{me.owner ? (
				<>
					{!isGameLaunched &&
						<div className="play-button">
							<button type="button" onClick={launchGame} onMouseOver={handleMouseOver}>
								PLAY
							</button>
						</div>
					}
				</>
			) : (
				<div className="not-owner">
					<p>Only the owner can start the game; if it's in progress, new players must wait until it ends before the owner starts a new one</p>
				</div>
			)}
		</div>
	);
};

export default Settings;
