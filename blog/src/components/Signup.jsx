const RegisterPage = () => {
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="#">Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;
