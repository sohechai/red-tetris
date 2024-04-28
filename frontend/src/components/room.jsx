import logo from "../assets/tetris-logo.svg";
import homeImg from "../assets/home-img.png";

const Room = () => {
  return (
    <div className="room-container">
      <img src={logo} alt="Tetris Logo" className="logo" />
      <div className="room-box">
        <form>
          <label htmlFor="room-name">Room Name</label>
          <input type="text" placeholder="Room Name" />
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" />
          <button type="submit">Create Room</button>
          <button type="submit">Join Room</button>
        </form>
      </div>
    </div>
  );
};

export default Room;
