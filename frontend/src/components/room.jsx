import logo from "../assets/tetris-logo.svg";

const Room = () => {
  return (
    <div className="room-container">
      <img src={logo} alt="Tetris Logo" className="logo" />
      <div className="room-box">
        <div className="room-form">
          <form>
            <label htmlFor="room-name">Room Name</label>
            <input type="text" placeholder="Room Name" />
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" />
            <button type="submit">Create / Join Room</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Room;
