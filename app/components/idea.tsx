import { Link } from "@remix-run/react";
import { Button, Col, Form, Row } from "react-bootstrap";

//Note: Is used nowhere!
function IdeaComp({ url, comments }: { url: string; comments: string[] }) {
  return (
    <div>
      {comments.length > 0 ? <h3 className="m-l-30%">Твоите коментари</h3> : ""}
      <div className="m-l-30%">
        {comments.map((comment, i) => (
          <Row className="mb-2" key={i}>
            <Col sm={10}>
              <h4>{comment}</h4>
            </Col>
          </Row>
        ))}
      </div>
      <Form method="post" action={url} className="text-center">
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Коментирай</Form.Label>
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
    </div>
  );
}

export default IdeaComp;
