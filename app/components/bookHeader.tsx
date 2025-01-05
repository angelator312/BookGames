import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import type { Text } from "~/utils/textStore";

export default function BookHeader({
  e,
  avt = false,
}: {
  e: Text;
  avt?: boolean;
}) {
  if (!e) return;
  return (
    <Container style={{ marginTop: "1rem" }} fluid>
      <Row>
        <Col>
          <img src="/img/book.png" alt="Book" width={60} height={60} />
        </Col>
        <Col xs={6}>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{e.text2}</Tooltip>}
          >
            <a href={`/book/${e.text}`}>
              <h3 className="text-bold text-dark">
                {e.id}
              </h3>
            </a>
          </OverlayTrigger>
        </Col>
        <Col className="text-bold text-dark" xs={2}>
          {e.avtor}
        </Col>
        {/* <br /> */}
        {avt ? (
          <Col className="text-center">
            <DropdownButton title="Действия" id="dropdown-basic-button">
              <Dropdown.Item
                //method=post
                href={`/myBook/${e.text}/publish`}
                disabled={e.public}
              >
                Публикувай
              </Dropdown.Item>
              <Dropdown.Item href={`/delete/${e.text}/`}>Изтрий</Dropdown.Item>
            </DropdownButton>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}
