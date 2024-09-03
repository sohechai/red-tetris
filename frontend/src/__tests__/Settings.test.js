import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../components/Settings';
import { gameEnd, setupWinListeners, setupMeInfo } from '../socketActions';

jest.mock('../socketActions', () => ({
	gameEnd: jest.fn(),
	setupWinListeners: jest.fn(),
	setupMeInfo: jest.fn(),
}));


describe('Settings Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders correctly and handles game launch', () => {
		render(<Settings />);

		const playButton = screen.queryByTestId('play-button');
		expect(playButton).toBeInTheDocument();

		if (playButton) {
			fireEvent.click(playButton);
			expect(gameEnd).toHaveBeenCalled();
		}
	});

	test('shows not owner message when not the owner', () => {
		render(<Settings />);

		const message = screen.getByText(/Not the owner/i);
		expect(message).toBeInTheDocument();
	});

	test('dispatches correct actions on mount', () => {
		render(<Settings />);

		expect(gameEnd).toHaveBeenCalled();
		expect(setupWinListeners).toHaveBeenCalled();
		expect(setupMeInfo).toHaveBeenCalled();
	});
});
