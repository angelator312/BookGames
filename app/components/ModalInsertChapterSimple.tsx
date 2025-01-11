import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

export function ModalInsertChapterSimple({
  showInsertChapter,
  handleCloseInsertChapter,
  handleInsertChapter,
}: {
  showInsertChapter: boolean;
  handleCloseInsertChapter: () => void;
  handleInsertChapter: (insertChapter: number, text: string) => void;
}) {
  const [insertChapter, setInsertChapter] = useState(0);
  const [insertText, setInsertText] = useState("");
  return (
    <Modal show={showInsertChapter} onHide={handleCloseInsertChapter}>
      <Modal.Header closeButton>
        <Modal.Title>Вмъкни Глава</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <input
              value={insertChapter}
              onChange={(e) => setInsertChapter(parseInt(e.target.value))}
              type="number"
              placeholder="Глава"
            />
          </Col>
          {" "}
          <Col>
            <input
              value={insertText}
              onChange={(e) => setInsertText(e.target.value)}
              type="string"
              placeholder="Текст в бутона"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col>
            <Button variant="secondary" onClick={handleCloseInsertChapter}>
              Затвори
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => handleInsertChapter(insertChapter, insertText)}>
              Вмъкни
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}
