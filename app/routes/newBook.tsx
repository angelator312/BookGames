import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import NavYesOrNo from "~/components/navbarYes";
import { requireUserId } from "~/utils/session.server";
import getTextStore from "~/utils/textStore";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const name = form.get("name")?.toString();
  const shD = form.get("shortDescription")?.toString();
  const a = await requireUserId(request, false);
  if (
    typeof a === "string" &&
    typeof name === "string" &&
    typeof shD === "string"
  ) {
    const tStore = await getTextStore();
    await tStore.addBook(name?.toString() ?? " ", a, false, shD);
    return redirect("/");
  }

  return redirect("/newBook?errCode=3");
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
  const errCode = searchParams.get("errCode");
  let [err] = useState(searchParams.get("err"));
  if (!err) {
    switch (errCode) {
      case "1":
        err = "Съкратеното име на книгата трябва да е с английски букви!";
        break;
      case "2":
        err = "Измислете друго съкратено име на книгата";
        break;
      case "3":
        err = "Нещо се обърка!";
        break;
      default:
        break;
    }
  }

  return (
    <div className="centered">
      <h1 className="centered">Нова книга</h1>
      <Row className="mb-3">
        <NavYesOrNo text={err ?? ""} yes={false} />
      </Row>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        method="POST"
      >
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
            <Form.Label column sm="2">
              Името на книгата
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                placeholder="Име"
                name="name"
                minLength={6}
              />
              <Form.Control.Feedback>Става!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Моля,напишете името ( най-малко 6 буквено ) на книгата
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
            <Form.Label column sm="2">
              Краткото описание на книгата
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                placeholder="Хубава книга разказваща за ... "
                name="shortDescription"
                maxLength={30}
              />
              <Form.Control.Feedback>Става!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Моля,напишете кратко описание!
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col sm="2"></Col>
          <Col sm="10">
            <Button type="submit" variant="danger" className="centered m-r-3">
              Нова книга
            </Button>

            <Link to="/">
              <Button variant="secondary">Към главната страница</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
