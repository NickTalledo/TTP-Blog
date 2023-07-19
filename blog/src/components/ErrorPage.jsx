import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col items-center h-screen justify-center"
    >
      <Header />
      <br />
      <h1>Oops!</h1>
      <br />
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <br />
      <Footer />
    </div>
  );
}
