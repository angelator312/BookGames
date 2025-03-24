import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { logout } from "~/utils/session.server";
import stylesUrl from "~/styles/login.css";
import { Link } from "@remix-run/react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

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
    <Container className="bg-i">
      <Row>
        <Col>
          <h1 className="text-slate-500 text-center text-dark">
            Излизане от профила
          </h1>
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <h2 className="text-slate-500 text-center text-dark">
            Сигурен ли си, че искаш да излезеш от профила си?
          </h2>
        </Col>
      </Row>
      <Row className="m-5">
        <Col>
          <Form method="post">
            <Button type="submit" variant="danger">
              {"Да"}
            </Button>
          </Form>
        </Col>
        <Col>
          <Link to="/">
            <Button variant="secondary">Не</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
