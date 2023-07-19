import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-us-container">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to our blog platform! We are a community of passionate writers
          and readers who love sharing their thoughts and ideas through posts
          and comments.
        </p>
        <p className="mb-4">
          Our mission is to create a space where users can freely express
          themselves, learn from each other, and engage in meaningful
          discussions on various topics.
        </p>
        <p className="mb-4">
          As a member of our community, you can create your own posts, comment
          on others&apos; posts, and connect with like-minded individuals who
          share your interests.
        </p>
        <p className="mb-4">
          We value respectful and constructive interactions, and we encourage
          you to be an active participant in building a supportive and inclusive
          environment for everyone.
        </p>
        <p className="mb-4">
          Thank you for being a part of our blog community. Together, let&apos;s
          make this platform a place of inspiration, learning, and connection.
        </p>
        <p>- The Blooger Team</p>
      </div>

      <Footer />
    </div>
  );
};

export default About;
