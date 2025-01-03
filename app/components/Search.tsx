import { useSearchParams } from "@remix-run/react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function SearchComponent() {
  const [params] = useSearchParams();
  return (
      <Form action="/" method="get">
        <Row>
          <Col sm={1}>
            <Form.Label>
              <Search color="black" style={{ display: "inline" }} />
            </Form.Label>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                name="query"
                placeholder="Търси"
                defaultValue={params.get("query") ?? ""}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                type="submit"
              >
                Button
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>
  );
}
