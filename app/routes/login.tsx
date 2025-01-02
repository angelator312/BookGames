// import { Outlet } from "@remix-run/react";
// import bcrypt from "bcryptjs";
import { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { createUserSession, getUserId } from "~/utils/session.server";
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
// import  { User } from "~/utils/mongostore";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import stylesUrl from "~/styles/login.css";
import getUserStore from "~/utils/userStore";
import { Link, useSearchParams } from "@remix-run/react";
import NavYesOrNo from "~/components/navbarYes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];
// import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const pass = form.get("pass")?.toString().trim();
  const username = form.get("user")?.toString().trim();

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof pass !== "string" || typeof username !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  const users = await getUserStore();
  const userCheck = await users.checkUser(username, pass);
  if (!userCheck) {
    return redirect(`/login?errCode=1`);
  }
  // type UserWId=Omit(User,"_id",);

  const url = request.url;
  const searchParams = new URLSearchParams(url);

  return createUserSession(
    userCheck.user,
    searchParams.get("redirectTo") ?? "/"
  );

  //const fields = { content, name };

  //const joke = await db.joke.create({ data: fields });
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const u = await getUserId(request);
  if (u) return redirect("/");
  return true;
};

function FormExample() {
  // console.log(1);
  const [searchParams] = useSearchParams();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const feedCode = searchParams.get("feedCode");
  const errCode = searchParams.get("errCode");
  let [sign] = useState(searchParams.get("feed"));
  let [err] = useState(searchParams.get("err"));

  if (!sign) {
    switch (feedCode) {
      case "1":
        sign = "Запазването приключи!";
        break;
      case "2":
        sign =
          "Регистрацията завърши успешно,но сега трябва да влезеш в профила си!";
        break;
      default:
        break;
    }
  }

  if (!err) {
    switch (errCode) {
      case "1":
        err = "Потребителското име или паролата са грешни!";
        break;

      default:
        break;
    }
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1 className="centered">Вход</h1>
          <NavYesOrNo text={sign ?? ""} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              method="POST"
            >
              <Row className="mb-3">
                <NavYesOrNo text={err ?? ""} yes={false} />
              </Row>
              <Row className="mb-3S">
                <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                  <Form.Label column sm="2">
                    Име
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Име"
                      name="user"
                    />
                    <Form.Control.Feedback>Става!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Моля, напишете име!
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
                  <Form.Label column sm="2">
                    Парола
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      required
                      type="password"
                      placeholder="Парола"
                      name="pass"
                    />
                    <Form.Control.Feedback>Става!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Моля, напишете парола!
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Col sm="2"></Col>
                <Col sm="1" className="mb-3">
                  <Button type="submit" variant="danger" className="centered m-r-3">
                    Вход
                  </Button>
                </Col>
                <Col sm="1"></Col>
                <Col sm="2" className="mb-3">
                  <Link to="/signup">
                    <Button variant="secondary">Регистрация</Button>
                  </Link>
                </Col>
                <Col sm="1"></Col>
                <Col sm="1" className="mb-3">
                  <Link to="/">
                    <Button variant="secondary">Начало</Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default FormExample;
