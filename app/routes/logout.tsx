import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { logout } from "~/utils/session.server";
import stylesUrl from "~/styles/login.css";
import { Button } from "react-bootstrap";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await logout(request);
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function LogoutRoute() {
  //   eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const [searchParams] = useSearchParams();
  return (
    <main className="login-main">
      <div className="container">
        <div className="bg-white">
          <h1 className="home-link ">
            <span className="text-slate-500 font-medium text-center text-dark">
              Logout
            </span>
          </h1>
          <div>
            <h2 className="text-slate-500 font-medium text-center text-dark text-dark">
              Are you sure you want to log out??
            </h2>
            <form method="post">
              {/* <div>
                <label htmlFor="username-input">Username</label>
                <input type="text" id="username-input" name="user" />
              </div> */}

              {/* <div>
                <label htmlFor="password-input">Password</label>
                <input id="password-input" name="pass" type="password" />
              </div> */}

              <Button
                type="submit"
                style={{ width: 45 }}
                variant="outline-light"
                className="text-dark text-2bold text-center"
              >
                Yes
              </Button>
            </form>
            <Link to="/">
              <Button
                type="submit"
                style={{ width: 45 }}
                variant="outline-light"
                className="text-dark text-2bold"
              >
                No
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
