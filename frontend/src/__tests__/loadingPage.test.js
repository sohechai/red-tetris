import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the extra matchers
import LoadingPage from '../components/LoadingPage'; // Adjust the path based on your file structure
import { act } from 'react';

describe('LoadingPage Component', () => {
	beforeEach(() => {
		jest.useFakeTimers(); // Use fake timers to control the setTimeout
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	it('displays loading text initially', () => {
		render(<LoadingPage />);
		
		expect(screen.getByText('LOADING')).toBeInTheDocument();
		expect(screen.getByText('PLS')).toBeInTheDocument();
		expect(screen.getByText('WAIT')).toBeInTheDocument();
	});

	it('starts animation after 3 seconds', () => {
		render(<LoadingPage />);
		
		// Fast-forward time by 3 seconds
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
});
