const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
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
        Don&apos;t have an account? <a href="#">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;
