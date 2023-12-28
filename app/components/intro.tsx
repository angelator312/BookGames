import { Link } from "@remix-run/react";

export default function Intro() {
  //   const user = useLoaderData<string>();
  return (
    <div>
      <h1 style={{ padding: 15.4 }}>Welcome to e-books</h1>
      <h3 className="logo">Hello Anonymous Who are you?</h3>
      <span>We have book: Голямото приключение and many more</span>
      <br />
      <h2>
        <Link to="/login">
          <span className="logo-medium">Log in </span>
        </Link>
        <span style={{ paddingLeft: 5, paddingRight: 5 }}>or</span>
        <Link to="/signup">
          <span className="logo-medium"> Sign up </span>
        </Link>
      </h2>
    </div>
  );
}
