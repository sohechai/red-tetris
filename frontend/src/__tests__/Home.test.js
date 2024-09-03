import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('Home Component', () => {
	const navigate = jest.fn();

	beforeEach(() => {
		useNavigate.mockReturnValue(navigate);
		jest.useFakeTimers();
	});

	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test('renders Home component and button PLAY', () => {
		render(<Home />);
		expect(screen.getByText('PLAY')).toBeInTheDocument();
	});

	test('handles button click and navigates to /room', () => {
		render(<Home />);
		fireEvent.click(screen.getByText('PLAY'));
		expect(navigate).toHaveBeenCalledWith('/room');
	});
});
