import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import { requireUserId } from "~/utils/session.server";
import getTextStore from "~/utils/textStore";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const name = form.get("name")?.toString();
  const abbr = form.get("abbr")?.toString();
  const a = await requireUserId(request, false);
  if (typeof a === "string") {
    // const user = await (await getUserStore()).getUser(a);
    const tStore=await getTextStore();
    if (await tStore.getBook(abbr?? " ")) {
        return redirect(
          "/newBook?err=There is a book with the same abbreviation!"
        );    
    }
    await tStore.addBook(name?.toString() ?? " ",abbr?? " ",a,false);
    return redirect("/");
  }
  return redirect("/newBook?err=Something when wrong!");
};

export default function NewBookRoute() {
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
  const [err] = useState(searchParams.get("err") || " ");
  return (
    <div>
      <h1 className="centered">New Book</h1>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        method="POST"
      >
        <Row className="mb-3">
          <p className="text-danger">{err}</p>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
            <Form.Label column sm="2">
              Name of book
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                minLength={6}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input a valid name.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
            <Form.Label column sm="2">
              The abbreviated name of the book
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="password"
                placeholder="abbreviated name"
                name="abbr"
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
            <Button type="submit" className="centered m-r-3">
              New Book
            </Button>

            <Link to="/">
              <Button variant="success">Start</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
