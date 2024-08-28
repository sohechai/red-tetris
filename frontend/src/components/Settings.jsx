import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameEnd, joinRoom, startGame } from "../socketActions";

const Settings = () => {
	const me = useSelector((state) => state.me.me);
	const dispatch = useDispatch();
	const isGameEnded = useSelector((state) => state.gameState.isGameEnded);
	const [isGameLaunched, setIsGameLaunched] = useState(false);

	const launchGame = (e) => {
		e.preventDefault();
		dispatch(startGame());
		setIsGameLaunched(true);
	};

	useEffect(() => {
		dispatch(gameEnd());
	}, [dispatch]);

	useEffect(() => {
		if (isGameEnded) {
			setIsGameLaunched(false);
		}
	}, [isGameEnded])

	return (
		<div className="room-settings">
			<h1 className="h1-header">GAME MODE</h1>

			{me.owner ? (
				<>
					{!isGameLaunched &&
						<div className="play-button">
							<button type="button" onClick={launchGame}>
								PLAY
							</button>
						</div>
					}
				</>
			) : (
				<div className="not-owner">
					<p>Waiting for the owner to start the game</p>
				</div>
			)}
		</div>
	);
};

export default Settings;
