import sendButton from "../assets/send.svg";
import "../App.css";

const Chat = () => {
  // const messages = useSelector((state) => state.messages.messages);

  const messages = [
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
  ];

  const sendMessage = () => {
    console.log("send message");
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
        <input type="text" placeholder="message" />
        <img src={sendButton} alt="send" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
