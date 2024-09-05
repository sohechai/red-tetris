import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dropPiece, FallByOne, gameEnd, MoveLeft, MoveRight, Rotate, setupMapListeners, setupMeInfo, setupNextPieceListeners, setupopponentsMapListeners, setupUserListeners, setupWinListeners } from "../socketActions.jsx";
import logo from "../assets/tetris-logo.svg";
import Game from "./Game.jsx";
import Chat from "./Chat.jsx";
import Lobby from "./Lobby.jsx";
import Settings from "./Settings.jsx";
import NextP from "./NextP.jsx";
import OpponentsMap from "./OpponentsMap.jsx";
import { useNavigate } from "react-router-dom";

export const handleKeyPress = (e, dispatch) => {
	//  correction de bug car je n'arrivais pas a ecrire dans le chat avec cette fonction
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

const RoomName = () => {
	const me = useSelector((state) => state.me.me);
	const map = useSelector((state) => state.map.map);
	const users = useSelector((state) => state.users.users);
	const nextPiece = useSelector((state) => state.nextPiece.nextPiece);
	const opponentsGrid = useSelector((state) => state.opponentsMap.opponentsMap);
	const win = useSelector((state) => state.win.win); 	// TODO recuperer le winner et loose pour retur soit loose pop up soit win pop up
	let isGameEnded = useSelector((state) => state.gameState.isGameEnded);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		const cleanup = dispatch(setupUserListeners());
		const cleanup2 = dispatch(setupMeInfo());
		const cleanup3 = dispatch(setupMapListeners());
		const cleanup4 = dispatch(setupNextPieceListeners());
		const cleanup5 = dispatch(setupopponentsMapListeners());
		const cleanup6 = dispatch(gameEnd());
		const cleanup7 = dispatch(setupWinListeners());
		return () => {
			cleanup();
			cleanup2();
			cleanup3();
			cleanup4();
			cleanup5();
			cleanup6();
			cleanup7();
		};
	}, [dispatch]);

	// note : le crash arrive lorsque le user n'est pas assigné et qu'on reload la page
	useEffect(() => {
		if (me.length === 0) {
			navigate("/");
		}
	}, [me]);
	
	useEffect(() => {
		window.addEventListener('keydown', (e) => handleKeyPress(e, dispatch));

		return () => {
			window.removeEventListener('keydown',(e) => handleKeyPress(e, dispatch));
		};
	}, [dispatch]);

	return (
		<div className="room-container" id="#room">
			<div className="room-header">
				<img alt="Tetris Logo" className="logo" src={logo} />
			</div>
			<div className="room-content">
				<div className="room-grid">
					<div className="room-grid-header">Room Name : {me.room}</div>
					<div className="room-player">
						<h1 className="h1-red">{me.pseudo}</h1>
					</div>
					<Chat />
					<Game map={map}/>
					<NextP type={"T"} nextPiece={ nextPiece } />
					<OpponentsMap opponentsGrid={ opponentsGrid }/>
					<Lobby users={users}/>
					<Settings win={ win } me={ me } isGameEnded={ isGameEnded } />
				</div>
			</div>
		</div>
	);
};

export default RoomName;
