import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoomName from '../components/RoomName';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as socketActions from '../socketActions';

jest.mock('../components/Chat', () => () => <div data-testid="chat-component" />);
jest.mock('../components/Game', () => () => <div data-testid="game-component" />);
jest.mock('../components/NextP', () => () => <div data-testid="nextp-component" />);
jest.mock('../components/OpponentsMap', () => () => <div data-testid="opponentsmap-component" />);
jest.mock('../components/Lobby', () => () => <div data-testid="lobby-component" />);
jest.mock('../components/Settings', () => () => <div data-testid="settings-component" />);

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}));

jest.mock('../socketActions', () => ({
	setupMeInfo: jest.fn(),
	setupUserListeners: jest.fn(),
	dropPiece: jest.fn(),
	FallByOne: jest.fn(),
	MoveLeft: jest.fn(),
	MoveRight: jest.fn(),
	Rotate: jest.fn(),
}));

afterEach(() => {
	cleanup();
	jest.clearAllMocks();
});

describe('RoomName Component', () => {
	test('renders correctly and calls actions', () => {
		const dispatch = jest.fn();
		useDispatch.mockReturnValue(dispatch);
		useSelector.mockImplementation((selector) => {
			if (selector.name === 'state.me.me') {
				return { length: 1, room: 'Test Room', pseudo: 'Test User' };
			}
			if (selector.name === 'state.chat.messages') {
				return [];
			}
			return {};
		});

		render(
			<MemoryRouter>
				<RoomName />
			</MemoryRouter>
		);

		expect(screen.getByTestId('chat-component')).toBeInTheDocument();
		expect(screen.getByTestId('game-component')).toBeInTheDocument();

		expect(dispatch).toHaveBeenCalledWith(socketActions.setupUserListeners());
		expect(dispatch).toHaveBeenCalledWith(socketActions.setupMeInfo());
	});
});
