import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NextP from '../components/NextP';
import { useDispatch, useSelector } from 'react-redux';
import { setupNextPieceListeners } from '../socketActions';
import {

I_PIECE,
J_PIECE,
L_PIECE,
O_PIECE,
S_PIECE,
T_PIECE,
Z_PIECE,
} from '../assets/data/tetris-piece';

jest.mock('react-redux', () => ({
useDispatch: jest.fn(),
useSelector: jest.fn(),
}));

jest.mock('../socketActions', () => ({
setupNextPieceListeners: jest.fn(),
}));

describe('Composant NextP', () => {
beforeEach(() => {
	jest.clearAllMocks();
});

test('affiche correctement le prochain morceau', () => {
	useSelector.mockReturnValue('I');
	const dispatch = jest.fn();
	useDispatch.mockReturnValue(dispatch);
	render(<NextP type="I" />);
	expect(screen.getByText('NEXT PIECE')).toBeInTheDocument();
	const cells = screen.getAllByTestId(/cell-/);
	expect(cells).toHaveLength(I_PIECE.flat().length);
	cells.forEach((cell, index) => {
		expect(cell).toHaveClass(I_PIECE.flat()[index]);
	});
});

test('appelle setupNextPieceListeners sur le premier rendu', () => {
	useSelector.mockReturnValue('T');
	const dispatch = jest.fn();
	useDispatch.mockReturnValue(dispatch);
	render(<NextP type="T" />);
	expect(setupNextPieceListeners).toHaveBeenCalledTimes(1);
	expect(dispatch).toHaveBeenCalledWith(setupNextPieceListeners());
});
});
