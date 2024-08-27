import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sendButton from "../assets/send.svg";
import { sendMessage, setupChatListeners } from '../socketActions';
import "../App.css";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const cleanup = dispatch(setupChatListeners());
    return cleanup;
  }, [dispatch]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      dispatch(sendMessage(inputMessage));
      setInputMessage(''); 
    }
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className="room-chat">
      <h1 className="h1-header">CHAT</h1>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div className="chat-message" key={index}>
            {message.pseudo} : {message.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="message"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSendMessage();
            }
          }}
        />
        <img
          src={sendButton}
          alt="send"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
