import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { logout } from "~/utils/session.server";
import stylesUrl from "~/styles/login.css";
import myStyles from "~/styles/myStyle.css";
import { Link } from "@remix-run/react";
import { Button, Row } from "react-bootstrap";
import FormComponent from "~/components/formComp";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await logout(request);
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: myStyles },
  { rel: "stylesheet", href: stylesUrl },
];

export default function LogoutRoute() {
  //   eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const [searchParams] = useSearchParams();
  return (
    <main className="login-main bg-i">
      <div className="container bg-i">
        <div className="bg-white bg-i">
          <h1 className="home-link ">
            <span className="text-slate-500 text-center text-dark">
              Излизане от профила
            </span>
          </h1>
          <div>
            <h2 className="text-slate-500 text-center text-dark">
              Сигурен ли си ,че искаш да излезеш от профила си?
            </h2>
          </div>
          <FormComponent textForSubmit={"Да"} to={"/logout"} submitVariant="danger" />
          <Row>
            <Link to="/">
              <Button variant="secondary">Не</Button>
            </Link>
          </Row>{" "}
        </div>
      </div>
    </main>
  );
}
