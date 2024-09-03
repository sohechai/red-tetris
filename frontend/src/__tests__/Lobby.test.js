import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Lobby from '../components/Lobby';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
}));

describe('Composant Lobby', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('affiche le titre LOBBY et le nombre de joueur', () => {
		useSelector.mockReturnValue([
			{ pseudo: 'player1', score: 10, owner: false },
			{ pseudo: 'player2', score: 20, owner: true },
			{ pseudo: 'player3', score: 30, owner: false },
		]);

		render(<Lobby />);

		expect(screen.getByTestId('lobby-title')).toHaveTextContent('LOBBY');
		expect(screen.getByTestId('user-count')).toHaveTextContent('3 / 5');

		expect(screen.getByTestId('player-0')).toBeInTheDocument();
		expect(screen.getByTestId('player-pseudo-0')).toHaveTextContent('player1');
		expect(screen.getByTestId('player-score-0')).toHaveTextContent('score : 10');
		expect(screen.getByTestId('player-no-owner-0')).toBeInTheDocument();
		
		expect(screen.getByTestId('player-1')).toBeInTheDocument();
		expect(screen.getByTestId('player-pseudo-1')).toHaveTextContent('player2');
		expect(screen.getByTestId('player-score-1')).toHaveTextContent('score : 20');
		expect(screen.getByTestId('player-owner-1')).toBeInTheDocument();
		
		expect(screen.getByTestId('player-2')).toBeInTheDocument();
		expect(screen.getByTestId('player-pseudo-2')).toHaveTextContent('player3');
		expect(screen.getByTestId('player-score-2')).toHaveTextContent('score : 30');
		expect(screen.getByTestId('player-no-owner-2')).toBeInTheDocument();
	});

	test('affiche 0 / 5 lorsqu\'il n\'y a pas de joueur', () => {
		useSelector.mockReturnValue([]);

		render(<Lobby />);

		expect(screen.getByTestId('user-count')).toHaveTextContent('0 / 5');
	});
});
