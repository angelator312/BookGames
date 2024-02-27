// import { Outlet } from "@remix-run/react";
// import bcrypt from "bcryptjs";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
// import { createUserSession } from "~/utils/session.server";
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
// import  { User } from "~/utils/mongostore";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Link, useSearchParams } from "@remix-run/react";

import stylesUrl from "~/styles/login.css";
import getUserStore from "~/utils/userStore";
import { Link, useSearchParams } from "@remix-run/react";
import { getUserId } from "~/utils/session.server";
import NavYesOrNo from "~/components/navbarYes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];
// import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const pass = form.get("pass");
  const pass2 = form.get("pass2");
  const username = form.get("user");
  const users = await getUserStore();
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof pass !== "string" || typeof username !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  const user = await users.getUser(username);

  if (user) {
    return redirect(`/signup?errCode=1`);
  }
  if (pass != pass2) return redirect(`/signup?errCode=2`);
  // console.log(username, pass);
  users.addUser(username, pass);
  return redirect(`/login?feedCode=2 `);

  //const fields = { content, name };

  //const joke = await db.joke.create({ data: fields });
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const u = await getUserId(request);
  if (u) return redirect("/");
  return true;
};

function FormExample() {
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

  const errCode = searchParams.get("errCode");
  let [err] = useState(searchParams.get("err"));

  if (!err) {
    switch (errCode) {
      case "1":
        err = "Вече има потребител с такова име!";
        break;

      case "2":
        err = "Паролите трябва да са еднакви!";
        break;

      default:
        break;
    }
  }

  return (
    <>
      <h1 className="centered">Sign up</h1>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        method="POST"
        action="/signup"
      >
        <Row className="mb-3">
          <NavYesOrNo text={err ??""} yes={false}/>
        </Row>
        <Row className="mb-3">
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
                minLength={4}
              />
              <Form.Control.Feedback>Става!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Моля, напишете валидно (най-малко 4 символа) име!
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3">
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
                minLength={8}
              />
              <Form.Control.Feedback>Става!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Моля,напишете валидна (най-малко 8 символа) парола!
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
            <Form.Label column sm="2">
              Парола отново
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="password"
                placeholder="Парола"
                name="pass2"
                minLength={8}
              />
              <Form.Control.Feedback>Става!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Моля,напишете валидна (най-малко 8 символа) парола!
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col sm="2"></Col>
          <Col sm="1" className="mb-3">
            <Button type="submit" variant="danger" className="centered m-r-3">Регистриране</Button>
          </Col>
          <Col sm="2"></Col>
          <Col sm="1" className="mb-3">
            <Link to="/login">
              <Button variant="secondary">Вход </Button>
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
    </>
  );
}

export default FormExample;
