import { Link } from "@remix-run/react";

export default function Intro() {
  //   const user = useLoaderData<string>();
  return (
    <div className="text-center">
      <div className="text-center">
        <h1 className="text-slate-500 font-medium logo text-primary p-3">
          Welcome to Game books
        </h1>
        <h3 className="text-slate-500 font-medium logo text-dark text-bold p-3">
          Hello Anonymous Who are you?
        </h3>
        <span className="text-slate-500 font-medium logo text-dark text-bold p-3">
          We have book: Голямото приключение and many more
        </span>
        <br />
        <h2>
          <Link to="/login">
            <span className="text-slate-500 font-medium logo text-primary p-3 logo-medium">
              Log in{" "}
            </span>
          </Link>
          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <pre> </pre>
          </span>
          <Link to="/signup">
            <span className="text-slate-500 font-medium logo text-primary p-3 logo-medium">
              {" "}
              Sign up{" "}
            </span>
          </Link>
        </h2>
      </div>
    </div>
  );
}
