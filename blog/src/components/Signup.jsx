import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Signup = () => {
  return (
    <div>
      <Header />
      <div className="register-container">
        <h1>Blooger!</h1>
        <p>A place to blog with your friends!</p>
        <h2 className="text-black">Register</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Signup!</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
