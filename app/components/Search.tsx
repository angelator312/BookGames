import { useSearchParams } from "@remix-run/react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function SearchComponent() {
  const [params] = useSearchParams();
  return (
    <Container>
      <Form action="/" method="get">
        <Row>
        <Col sm={1}>
          <Form.Label>
            <Search color="black" style={{display:"inline"}}/>
          </Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="text"
            name="query"
            placeholder="Search tweets..."
            defaultValue={params.get("query") ?? ""}
          />
        </Col>
        </Row>
      </Form>
    </Container>
  );
}
