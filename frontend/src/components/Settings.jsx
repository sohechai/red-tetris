import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameEnd, setupWinListeners, startGame } from "../socketActions";
import { useAudio } from "../utils/AudioContext";
import CustomPopup from "../utils/WinPopUp.jsx";

const Settings = () => {
	const me = useSelector((state) => state.me.me);
	const win = useSelector((state) => state.win.win); 	// TODO recuperer le winner et loose pour retur soit loose pop up soit win pop up
	const dispatch = useDispatch();
	let isGameEnded = useSelector((state) => state.gameState.isGameEnded);
	const [isGameLaunched, setIsGameLaunched] = useState(false);
	const { playSound } = useAudio();
	const [showPopup, setShowPopup] = useState(false);

	const handleMouseOver = () => {
		playSound('/sound/button_hover_sound.wav');
	};

	const launchGame = (e) => {
		e.preventDefault();
		dispatch(startGame());
		setIsGameLaunched(true);
	};

	useEffect(() => {
		dispatch(gameEnd());
		dispatch(setupWinListeners());
	}, [dispatch]);

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
