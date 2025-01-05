import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function ModalInsertChapterSimple({
  showInsertChapter,
  handleCloseInsertChapter,
  handleInsertChapter,
}: {
  showInsertChapter: boolean;
  handleCloseInsertChapter: () => void;
  handleInsertChapter: (insertChapter: number,text:string) => void;
}) {
  const [insertChapter, setInsertChapter] = useState(0);
  const [insertText, setInsertText] = useState("");
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
          placeholder="Глава"
        />
        <input
          value={insertText}
          onChange={(e) => setInsertText(e.target.value)}
          type="string"
          placeholder="Текст в бутона"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseInsertChapter}>
          Затвори
        </Button>
        <Button variant="primary" onClick={()=>handleInsertChapter(insertChapter,insertText)}>
          Вмъкни
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
