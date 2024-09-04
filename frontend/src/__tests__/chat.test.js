import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatMessage from '../components/ChatMessages';

describe('ChatMessage Component', () => {

  it('renders the correct number of messages', () => {
    const messages = [
      { pseudo: 'Alice', message: 'Hello, world!' },
      { pseudo: 'Bob', message: 'Hi, Alice!' },
      { pseudo: 'Charlie', message: 'Good morning!' }
    ];

    const { container } = render(<ChatMessage messages={messages} />);

    // Check that the correct number of chat messages are rendered
    expect(container.getElementsByClassName('chat-message')).toHaveLength(3);
  });

  it('renders the correct content for each message', () => {
    const messages = [
      { pseudo: 'Alice', message: 'Hello, world!' },
      { pseudo: 'Bob', message: 'Hi, Alice!' }
    ];

    const { getByText } = render(<ChatMessage messages={messages} />);

    // Check that specific messages are rendered
    expect(getByText('Alice : Hello, world!')).toBeInTheDocument();
    expect(getByText('Bob : Hi, Alice!')).toBeInTheDocument();
  });

  it('renders nothing when messages prop is empty', () => {
    const messages = [];

    const { container } = render(<ChatMessage messages={messages} />);

    // Check that no chat messages are rendered
    expect(container.getElementsByClassName('chat-message')).toHaveLength(0);
  });

});
