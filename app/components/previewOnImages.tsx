import { Col, Card, Row, Button } from "react-bootstrap";
import type { MiniInterface } from "~/utils/ImageThings";

export default function PreviewImages({
  minis: arrayOfMinimizedImages,
  handleInsertImage,
  options = { delete: false, names: true, handleDeleteImage: () => {} },
}: {
  minis: MiniInterface[];
  handleInsertImage: (insertID: string) => void;
  options?: {
    delete?: boolean;
    handleDeleteImage?: (id: string) => void;
    insert?: boolean;
    names?: boolean;
    xxl?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}) {
  if (options.delete && !options.handleDeleteImage) options.delete = false;
  return (
    <Row className="justify-content-center">
      {arrayOfMinimizedImages.map((e) => (
        <Col
        sm="auto"
          // sm={options.sm ?? "4"}
          // md={options.md ?? "3"}
          // lg={options.lg ?? "2"}
          // xxl={options.xxl ?? "1"}
          key={e.id}
          className="m-2"
        >
          <Card onClick={() => handleInsertImage(e.id)} className="p-2">
            <Card.Img
              // style={{ width: "128px", height: "128px" }}
              src={`data:image/png;base64,${e.thumbnail}`}
              alt="thumbnail"
              // className="m-2"
            />
            {options.delete ? (
              <Card.Body>
                <Button
                  variant="danger"
                  //@ts-ignore
                  onClick={() => options.handleDeleteImage(e.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            ) : null}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
