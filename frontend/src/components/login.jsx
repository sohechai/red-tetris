import logo from "../assets/tetris-logo.svg";

const signup = () => {
  return (
    <div>
      <img src={logo} alt="Tetris Logo" className="logo" />
      <div className="signup-container">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username / Email</label>
          <input type="text" placeholder="Username / email" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" />
        </form>
        <div className="login-bottom">
          <button type="submit">Login</button>
          <button type="submit">Login with 42</button>
        </div>
      </div>
    </div>
  );
};

export default signup;
