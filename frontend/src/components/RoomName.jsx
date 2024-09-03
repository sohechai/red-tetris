import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dropPiece, FallByOne, MoveLeft, MoveRight, Rotate, setupMeInfo, setupUserListeners } from "../socketActions.jsx";
import logo from "../assets/tetris-logo.svg";
import Game from "./Game.jsx";
import Chat from "./Chat.jsx";
import Lobby from "./Lobby.jsx";
import Settings from "./Settings.jsx";
import NextP from "./NextP.jsx";
import OpponentsMap from "./OpponentsMap.jsx";
import { useNavigate } from "react-router-dom";

const RoomName = () => {
	const me = useSelector((state) => state.me.me);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const cleanup = dispatch(setupUserListeners());
		const cleanup2 = dispatch(setupMeInfo());
	}, [dispatch]);

	useEffect(() => {
		if (me.length === 0) {
			navigate("/");
		}
	}, [me]);

	const handleKeyPress = (e) => {
		if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
			return;
		}

		e.preventDefault();

		switch (e.key) {
			case 'ArrowRight':
				dispatch(MoveRight());
				break;
			case 'ArrowLeft':
				dispatch(MoveLeft());
				break;
			case 'ArrowUp':
				dispatch(Rotate());
				break;
			case ' ':
				dispatch(dropPiece());
				break;
			case 'ArrowDown':
				dispatch(FallByOne());
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [dispatch]);

	return (
		<div className="room-container" data-testid="room-container">
			<div className="room-header">
				<img alt="Tetris Logo" className="logo" src={logo} data-testid="logo" />
			</div>
			<div className="room-content">
				<div className="room-grid">
					<div className="room-grid-header" data-testid="room-name">Room Name : {me.room}</div>
					<div className="room-player">
						<h1 className="h1-red" data-testid="player-name">{me.pseudo}</h1>
					</div>
					<Chat />
					<Game />
					<NextP type={"T"} />
					<OpponentsMap />
					<Lobby />
					<Settings />
				</div>
			</div>
		</div>
	);
};

export default RoomName;
