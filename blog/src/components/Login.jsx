import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <h1>Blooger!</h1>
      <p>A place to blog with your friends!</p>
      <h2 className="text-black">Login</h2>
      <form>
        <div className="input-group">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
