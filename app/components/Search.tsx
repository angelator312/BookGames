import { useSearchParams } from "@remix-run/react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function SearchComponent() {
  const [params] = useSearchParams();
  return (
    <Form action="/" method="get">
      <Row>
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
              <Search color="black" style={{ display: "inline" }} />
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}
