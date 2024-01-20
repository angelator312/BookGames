// import { Outlet } from "@remix-run/react";
// import bcrypt from "bcryptjs";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
// import { createUserSession } from "~/utils/session.server";
import type { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
// import  { User } from "~/utils/mongostore";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Link, useSearchParams } from "@remix-run/react";

import stylesUrl from "~/styles/login.css";
import getUserStore from "~/utils/mongostore";
import { Link, useActionData } from "@remix-run/react";
import { getUserId } from "~/utils/session.server";

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
    const error = "such a user exists";
    return json({ error });
  }
  if (pass != pass2) return json({ error: "Passwords must be same" });
  console.log(username, pass);
  users.addUser(username, pass);
  return redirect(`/login?signup=true`);

  //const fields = { content, name };

  //const joke = await db.joke.create({ data: fields });
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const u = await getUserId(request);
  if (u) return redirect("/");
  return true;
};

function FormExample() {
  const [validated, setValidated] = useState(false);
  const AD = useActionData<typeof action>();
  console.log(AD);
  //
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <h1 className="centered">Sign up</h1>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        method="POST"
      >
        <Row className="mb-3">
          <p className="text-danger">{AD?.error ? AD?.error : ""}</p>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                placeholder="Usernname"
                name="user"
                minLength={4}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input a username.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="pass"
                minLength={8}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input a password.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="pass2"
                minLength={8}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input a password.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col sm="2"></Col>
          <Col sm="10">
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm="2"></Col>
          <Col sm="10">
            <Button type="submit" className="centered m-r-3">
              Sign up
            </Button>

            <Link to="/login">
              <Button variant="success">Login</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormExample;
