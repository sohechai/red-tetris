import "../App.css";

const ChatMessages = (props) => {
    const messages = props.messages;

    return (<div className="chat-messages">
        {messages.map((message, index) => (
          <div className="chat-message" key={index}>
            {message.pseudo} : {message.message}
          </div>
        ))}
    </div>);
};
export default ChatMessages;