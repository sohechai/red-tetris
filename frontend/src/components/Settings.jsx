import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameEnd, setupMeInfo, setupWinListeners, startGame } from "../socketActions";
import CustomPopup from "../utils/WinPopUp.jsx";

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

const Settings = () => {
	const me = useSelector((state) => state.me.me);
	const win = useSelector((state) => state.win.win);
	const dispatch = useDispatch();
	let isGameEnded = useSelector((state) => state.gameState.isGameEnded);
	const [isGameLaunched, setIsGameLaunched] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const { width, height } = useWindowSize();

	const launchGame = (e) => {
		e.preventDefault();
		dispatch(startGame());
		setIsGameLaunched(true);
	};

	useEffect(() => {
		dispatch(gameEnd());
		dispatch(setupWinListeners());
		dispatch(setupMeInfo());
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
	}, [isGameEnded, win]);

	return (
		<div className="room-settings" data-testid="settings-container">
			<h1 className="h1-header" data-testid="header">START GAME</h1>
			<CustomPopup show={showPopup} win={win} width={width} height={height} />
			{me.owner ? (
				<>
					{!isGameLaunched &&
						<div className="play-button" data-testid="play-button">
							<button type="button" onClick={launchGame}>
								PLAY
							</button>
						</div>
					}
				</>
			) : (
				<div className="not-owner" data-testid="not-owner">
					<p>Only the owner can start the game; if it's in progress, new players must wait until it ends before the owner starts a new one</p>
				</div>
			)}
		</div>
	);
};

export default Settings;
