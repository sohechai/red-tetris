import logo from "../assets/tetris-logo.svg";

const signup = () => {
  return (
    <div>
      <img src={logo} alt="Tetris Logo" className="logo" />
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" />
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" />
        </form>
        <button type="submit">Sign Up</button>
      </div>
    </div>
  );
};

export default signup;
