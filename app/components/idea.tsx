import { Link } from "@remix-run/react";
import { Button, Col, Form, Row } from "react-bootstrap";

function IdeaComp({ url }: { url: string }) {
  return (
    <Form method="post" action={url}>
      <Row>
        <Col sm="3"></Col>
        <Col sm="6">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Коментар</Form.Label>
            <Form.Control
              type="text"
              placeholder="Напиши коментар"
              as="textarea"
              name="comment"
            />
            <Form.Text className="text-muted">
              Твоят коментар ще бъде видим само от автора!
            </Form.Text>
          </Form.Group>
          <Button variant="danger" type="submit">
            Коментирай
          </Button>
        </Col>
      </Row>
      <Row>
        <Col sm="4">
          <br />
        </Col>
      </Row>
      <Row>
        <Col sm="3"></Col>
        <Col sm="6">
          <Link to="/" className="mb-3">
            <Button variant="secondary">Към главната страница</Button>
          </Link>
        </Col>
      </Row>
      {/* <Row> */}
      {/* <pre> </pre> */}
      <br />
      <br />
      {/* </Row> */}
    </Form>
  );
}

export default IdeaComp;
