import { useSearchParams } from "@remix-run/react";
import { useRef } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Search, X } from "react-bootstrap-icons";

export default function SearchComponent() {
  const qRef = useRef();
  const [params] = useSearchParams();
  const query = params.get("query") ?? "";
  return (
    <Form action="/" method="get">
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <Button
              variant="outline-secondary"
              id="button-addon2"
              type="submit"
            >
              <Search color="black" style={{ display: "inline" }} />
            </Button>
            <Form.Control
              className="inp-bl"
              type="text"
              name="query"
              placeholder="Търси"
              defaultValue={query}
              ref={qRef}
            />
            {/* <Button
              disabled={query.length == 0}
              variant="outline-secondary"
              id="button-add"
              name="clear-query"
              onClick={() => console.log(qRef)}
            >
              <X color="black" style={{ display: "inline" }} />
            </Button> */}
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}
