import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '../components/Chat';

jest.mock('react-redux', () => ({
	useDispatch: () => jest.fn(),
	useSelector: jest.fn(),
}));

jest.mock('../socketActions', () => ({
	sendMessage: jest.fn(),
	setupChatListeners: jest.fn(() => () => {}),
}));

describe('Chat Component', () => {
	beforeEach(() => {
		require('react-redux').useSelector.mockImplementation((selector) =>
			selector({
				messages: {
					messages: [
						{ pseudo: 'User1', message: 'Hello!' },
						{ pseudo: 'User2', message: 'Hi!' },
					],
				},
			})
		);
	});

	test('renders Chat component and displays initial UI', () => {
		render(<Chat />);

		expect(screen.getByText('CHAT')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('message')).toBeInTheDocument();
		expect(screen.getByAltText('send')).toBeInTheDocument();
	});

	test('displays messages from the store', () => {
		render(<Chat />);

		expect(screen.getByText('User1 : Hello!')).toBeInTheDocument();
		expect(screen.getByText('User2 : Hi!')).toBeInTheDocument();
	});

	test('updates input field and sends message via button click', () => {
		const { getByPlaceholderText, getByAltText } = render(<Chat />);
		const input = getByPlaceholderText('message');
		const sendButton = getByAltText('send');

		fireEvent.change(input, { target: { value: 'Test message' } });
		expect(input.value).toBe('Test message');

		fireEvent.click(sendButton);
		expect(require('../socketActions').sendMessage).toHaveBeenCalledWith('Test message');
	});

	test('clears input field after sending message', () => {
		const { getByPlaceholderText, getByAltText } = render(<Chat />);
		const input = getByPlaceholderText('message');
		const sendButton = getByAltText('send');

		fireEvent.change(input, { target: { value: 'Test message' } });
		fireEvent.click(sendButton);
		expect(input.value).toBe('');
	});

	test('sends message when Enter key is pressed', () => {
		const { getByPlaceholderText } = render(<Chat />);
		const input = getByPlaceholderText('message');

		fireEvent.change(input, { target: { value: 'Test message' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
		expect(require('../socketActions').sendMessage).toHaveBeenCalledWith('Test message');
	});
});
