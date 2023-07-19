import Footer from "./Footer";
import Header from "./Header";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>
          If you have any questions, feedback, or just want to say hello, feel
          free to reach out to us. We&apos;d love to hear from you!
        </p>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
