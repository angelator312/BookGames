import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
} from "react-bootstrap";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

export default function EditText({
  text,
  text2,
  glava,
  bUrl,
  setText,
  setText2,
  priIzvikvane,
}: {
  text: string;
  text2: string;
  glava: string | number;
  bUrl: string;
  setText: Function;
  setText2: Function;
  priIzvikvane: Function;
}) {
  function handleEditorChange(value: any, event: any) {
    const arr = (value.replace(/\r/gm, "") ?? "").split(/^---\s*$/gm);
    setText(arr[0]);
    setText2(arr[1] ?? "");
    if (priIzvikvane) {
      priIzvikvane();
    }
  }
  const [showInsertChapter, setShowInsertChapter] = useState(false);

  const handleCloseInsertChapter = () => setShowInsertChapter(false);
  const handleInsertChapter = () =>{
    setText2(text2 + "=>(Глава 2)(резултат 0)[АААА]");
    return setShowInsertChapter(false);
  }
  const handleShowInsertChapter = () => setShowInsertChapter(true);
  return (
    <Container fluid>
      <Row>
        <ButtonGroup>
          {/* <Button onClick={() => setText("")}>Изчисти</Button> */}
          <Button
            variant="secondary"
            onClick={() => window.open("/helpLanguage")}
          >
            Помощ{" "}
          </Button>
          <DropdownButton
            as={ButtonGroup}
            title="Вмъкване"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1" onClick={handleShowInsertChapter}>На избор За Глава</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </Row>
      <Editor
        options={{
          unicodeHighlight: {
            ambiguousCharacters: false,
          },
        }}
        height="15vh"
        defaultLanguage="bg"
        onChange={handleEditorChange}
        
        // name="text"
        // placeholder="Здравей,Човече"
        defaultValue={
          (text == "" ? "Здравей,Човече" : text) + "\n---\n" + text2
        }
      />
      <Row>
        <Col></Col>
      </Row>
      <p>
        За нов абзац два празни реда
        <br />
        Посочете към коя глава сочи избора на читателя. Пр. "Към Светлината
        (Глава 2)" <strong>↓↓↓</strong>
      </p>
      <p>
        За линк към друга глава : (Глава число) Пр. "Бий се (Глава 3)" <br />
        Кръглите скоби () са задължителен атрибут при посочване на конкретна
        Глава
        <br />
      </p>

      <br />
      <Modal show={showInsertChapter} onHide={handleCloseInsertChapter}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInsertChapter}>
            Затвори
          </Button>
          <Button variant="primary" onClick={handleInsertChapter}>
            Вмъкни
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
