// src/__tests__/Chat.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers'; // Assurez-vous que le chemin vers le réducteur est correct
import Chat from '../components/Chat';
import { sendMessage, setupChatListeners } from '../socketActions';

// Mock des actions et du store
jest.mock('../socketActions', () => ({
  sendMessage: jest.fn(),
  setupChatListeners: jest.fn(() => () => {}),
}));

const renderWithRedux = (component) => {
  const store = createStore(rootReducer, {
    messages: {
      messages: []
    }
  });

  return render(<Provider store={store}>{component}</Provider>);
};

test('renders Chat component and displays initial UI', () => {
  renderWithRedux(<Chat />);

  expect(screen.getByText('CHAT')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('message')).toBeInTheDocument();
  expect(screen.getByAltText('send')).toBeInTheDocument();
});

test('displays messages from the store', () => {
  const initialState = {
    messages: {
      messages: [
        { pseudo: 'User1', message: 'Hello!' },
        { pseudo: 'User2', message: 'Hi!' },
      ],
    },
  };

  renderWithRedux(<Chat />, { preloadedState: initialState });

  expect(screen.getByText('User1 : Hello!')).toBeInTheDocument();
  expect(screen.getByText('User2 : Hi!')).toBeInTheDocument();
});

test('updates input field and sends message', () => {
  const { getByPlaceholderText, getByAltText } = renderWithRedux(<Chat />);
  const input = getByPlaceholderText('message');
  const sendButton = getByAltText('send');

  fireEvent.change(input, { target: { value: 'Test message' } });
  expect(input.value).toBe('Test message');

  fireEvent.click(sendButton);
  expect(sendMessage).toHaveBeenCalledWith('Test message');
});

test('clears input field after sending message', () => {
  const { getByPlaceholderText, getByAltText } = renderWithRedux(<Chat />);
  const input = getByPlaceholderText('message');
  const sendButton = getByAltText('send');

  fireEvent.change(input, { target: { value: 'Test message' } });
  expect(input.value).toBe('Test message');

  fireEvent.click(sendButton);
  expect(input.value).toBe('');
});

test('sends message when Enter key is pressed', () => {
  const { getByPlaceholderText } = renderWithRedux(<Chat />);
  const input = getByPlaceholderText('message');

  fireEvent.change(input, { target: { value: 'Test message' } });
  expect(input.value).toBe('Test message');

  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
  expect(sendMessage).toHaveBeenCalledWith('Test message');
});
