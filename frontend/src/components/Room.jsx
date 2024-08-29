import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	joinRoom,
	setupMeInfo,
	setupUserListeners,
} from "../socketActions.jsx";
import logo from "../assets/tetris-logo.svg";
import { GooCursor } from "../utils/cursor.jsx";
import store from "../store.jsx";

const Room = () => {
	const users = useSelector((state) => state.users.users);
	const dispatch = useDispatch();
	const [roomName, setRoomname] = useState("");
	const [username, setUsername] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	let navigate = useNavigate();

	// ajouter une fonction leave room pour que lorsque la room est pleine on puisse gerer le cas pour que le user leave la room juste apres avoir check
	const handleJoinRoom = async (e) => {
		e.preventDefault();

		if (!roomName.trim() || !username.trim()) {
			setErrorMessage("Both fields are required");
			return;
		}

		setErrorMessage("");

		dispatch(joinRoom(roomName, username, (error) => {
            setErrorMessage(error);
        }));

		let roomFull = false;

		await new Promise((resolve) => {
			const unsubscribe = store.subscribe(() => {
				const state = store.getState();
				const users = state.users.users;
				console.log('users ' + users.length);
				if (users.length >= 4) {
					console.log('room is full');
					roomFull = true;
					setErrorMessage("Room is full");
				}
				unsubscribe();
				resolve(); 
			});
		});

		setTimeout(() => {
			if (!roomFull) {
				navigate(`/${roomName}/${username}`);
				roomFull = false;
			}
		}, 0);
	};




	useEffect(() => {
		const cleanup = dispatch(setupUserListeners());
		const cleanup2 = dispatch(setupMeInfo());

		return () => {
			cleanup();
			cleanup2();
		};
	}, [dispatch]);

	useEffect(() => {
		const cursorEl = document.querySelector('.cursor');
		if (cursorEl) {
			new GooCursor(cursorEl);
		}
	}, []);

	return (
		<div className="room-container" id="#room">
			<img alt="Tetris Logo" className="logo" src={logo} id="play-logo" />
			<div className="room-form">
				<h1>Create / Join Room</h1>
				<form>
					<label htmlFor="room-name">Room Name</label>
					<input
						type="text"
						placeholder="Room Name"
						onChange={(e) => setRoomname(e.target.value)}
						style={{
							borderColor: !roomName.trim() && errorMessage ? "red" : "",
						}}
					/>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						style={{
							borderColor: !username.trim() && errorMessage ? "red" : "",
						}}
					/>
					{
						errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>
					}
					<button type="submit" onClick={handleJoinRoom}>
						Create / Join Room
					</button>
				</form>
			</div>
			<div className="cursor">
				<div className="cursor__inner">
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
					<defs>
						<filter id="gooey">
							<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
							<feColorMatrix
								in="blur"
								type="matrix"
								values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -7"
								result="gooey"
							/>
							<feMorphology in="gooey" operator="dilate" radius="2" result="outline" />
							<feComposite in="outline" in2="gooey" operator="out" />
						</filter>
					</defs>
				</svg>
			</div>
		</div>
	);
};

export default Room;
