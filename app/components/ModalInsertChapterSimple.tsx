import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function ModalInsertChapterSimple({
  showInsertChapter,
  handleCloseInsertChapter,
  handleInsertChapter,
}: {
  showInsertChapter: boolean;
  handleCloseInsertChapter: () => void;
  handleInsertChapter: (insertChapter: number) => void;
}) {
  const [insertChapter, setInsertChapter] = useState(0);
  return (
    <Modal show={showInsertChapter} onHide={handleCloseInsertChapter}>
      <Modal.Header closeButton>
        <Modal.Title>Вмъкни Глава</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={insertChapter}
          onChange={(e) => setInsertChapter(parseInt(e.target.value))}
          type="number"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseInsertChapter}>
          Затвори
        </Button>
        <Button variant="primary" onClick={()=>handleInsertChapter(insertChapter)}>
          Вмъкни
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
