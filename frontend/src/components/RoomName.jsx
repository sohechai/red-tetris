import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dropPiece, FallByOne, MoveLeft, MoveRight, Rotate, setupMapListeners, setupMeInfo, setupUserListeners } from "../socketActions.jsx";
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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		const cleanup = dispatch(setupUserListeners());
		const cleanup2 = dispatch(setupMeInfo());
		const cleanup3 = dispatch(setupMapListeners());
		
		return () => {
			cleanup();
			cleanup2();
			cleanup3();
		};
	}, [dispatch]);

	// note : le crash arrive lorsque le user n'est pas assigné et qu'on reload la page
	useEffect(() => {
		console.log("me : ", me);
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
					<NextP type={"T"} />
					<OpponentsMap />
					<Lobby users={users}/>
					<Settings />
				</div>
			</div>
		</div>
	);
};

export default RoomName;
