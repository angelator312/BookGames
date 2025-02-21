import { Col, Card, Row, Button } from "react-bootstrap";
import type { MiniInterface } from "~/utils/ImageThings";

export default function PreviewImages({
  minis,
  handleInsertImage,
  options = { delete: false, names: true, handleDeleteImage: () => {} },
}: {
  minis: MiniInterface[];
  handleInsertImage: (insertID: string) => void;
  options?: {
    delete: boolean;
    handleDeleteImage: (id: string) => void;
    insert?: boolean;
    names: boolean;
  };
}) {
  return (
    <Row className="justify-content-center">
      {minis.map((e) => (
        <Col sm="4" md="3" lg="2" xxl="1" key={e.id} className="m-2">
          <Card onClick={() => handleInsertImage(e.id)}>
            <Card.Img
              // style={{ width: "128px", height: "128px" }}
              src={`data:image/png;base64,${e.thumbnail}`}
              alt="thumbnail"
            />
            <Card.Body>
              <Card.Title>{options.names ? e.name : ""}</Card.Title>
              {options.delete ? (
                <Button
                  variant="danger"
                  onClick={() => options.handleDeleteImage(e.id)}
                >
                  Delete
                </Button>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
