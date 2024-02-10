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
            <span className="text-slate-500 text-center text-dark">
              Излизане от профила
            </span>
          </h1>
          <div>
            <h2 className="text-slate-500 text-center text-dark">
              Сигурен ли си ,че искаш да излезеш от профила си?
            </h2>
            <form method="post">
              <Button
                type="submit"
                style={{ width: 45 }}
                variant="outline-light"
                className="text-dark text-2bold text-center"
              >
                Да
              </Button>
            </form>
            <Link to="/">
              <Button
                type="submit"
                style={{ width: 45 }}
                variant="outline-light"
                className="text-dark text-2bold"
              >
                Не
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
