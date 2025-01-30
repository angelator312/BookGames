import { Col, Card, Row } from "react-bootstrap";
import type { MiniInterface } from "~/utils/ImageInterface";

export default function PreviewImages({
  minis,
  handleInsertImage,
}: {
  minis: MiniInterface[];
  handleInsertImage: (insertID: string) => void;
}) {
  return (
    <Row className="justify-content-center">
      {minis.map((e) => (
        <Col sm="4" md="3" lg="2" xxl="1" key={e.id} className="m-2">
          <Card onClick={() => handleInsertImage(e.id)}>
            <Card.Img
              //style={{ width: "128px", height: "128px" }}
              src={`data:image/png;base64,${e.thumbnail}`}
              alt="thumbnail"
            />
            <Card.Body>
              <Card.Title>{e.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
