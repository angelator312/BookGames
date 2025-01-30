import { useEffect, useState } from "react";
import { Card, Col, Modal, Row, Spinner } from "react-bootstrap";
import type { MiniInterface } from "~/utils/ImageInterface";

export default function GetImagesModal({
  show,
  handleClose,
  handleInsertImage,
}: {
  show: boolean;
  handleClose: () => void;
  handleInsertImage: (insertID: string) => void;
}) {
  const [minis, setMinis] = useState<MiniInterface[]>([]);
  const [showImages, setShowImages] = useState<boolean>(false);
  useEffect(() => {
    async function getImages() {
      if (show) {
        setMinis(await (await fetch("/getImages")).json());
      } else setMinis([]);
    }
    getImages().then((r) => {
      setShowImages(true);
    });
  }, [show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <h1>Images</h1>
      {!showImages ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}
      <Row>
        {minis.map((e) => (
          <Col
            key={e.id}
            className="m-2"
            onClick={() => handleInsertImage(e.id)}
          >
            <Card>
              <Card.Img
                style={{ width: "128px", height: "128px" }}
                src={`data:image/png;base64,${e.thumbnail}`}
                alt="thumbnail"
              />
              <Card.Body>
                <Card.Title>{e.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {minis.length % 3 == 1 ? <Col className="m-2"></Col> : null}
        {minis.length % 3 == 1 ? <Col className="m-2"></Col> : null}
        {minis.length % 3 == 2 ? <Col className="m-2"></Col> : null}
      </Row>
    </Modal>
  );
}
