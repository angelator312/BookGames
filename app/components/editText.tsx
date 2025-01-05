import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { Editor, type OnMount } from "@monaco-editor/react";
import React, { useState } from "react";
import type { editor } from "monaco-editor";
import { ModalInsertChapterSimple } from "./ModalInsertChapterSimple";
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
  const [monacoInstance, setMonacoInstance] =
    React.useState<editor.IStandaloneCodeEditor | null>(null);

  const insertText = (text: string) => {
    if (monacoInstance) {
      const selection = monacoInstance.getSelection();
      const id = { major: 1, minor: 1 };
      const op = {
        identifier: id,
        range: {
          startLineNumber: selection?.selectionStartLineNumber || 1,
          startColumn: selection?.selectionStartColumn || 1,
          endLineNumber: selection?.endLineNumber || 1,
          endColumn: selection?.endColumn || 1,
        },
        text,
        forceMoveMarkers: true,
      };
      monacoInstance.executeEdits("my-source", [op]);
    }
  };

  const editorMount: OnMount = (editorL: editor.IStandaloneCodeEditor) => {
    setMonacoInstance(editorL);
  };
  function handleEditorChange(value: any, event: any) {
    const arr = (value.replace(/\r/gm, "") ?? "").split(/^---\s*$/gm);
    setText(arr[0]);
    setText2(arr[1] ?? "");
    if (priIzvikvane) {
      priIzvikvane();
    }
  }
  const [showInsertChapter, setShowInsertChapter] = useState(false);
  function handleInsertChapter(insertChapter: number) {
    insertText(`=>(Глава ${insertChapter})(резултат 0)[АААА]`);
    return setShowInsertChapter(false);
  }

  const handleCloseInsertChapter = () => setShowInsertChapter(false);
  const handleShowInsertChapter = () => setShowInsertChapter(true);
  return (
    <Container fluid>
      <Row>
        <Col>
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
              <Dropdown.Item eventKey="1" onClick={handleShowInsertChapter}>
                На избор За Глава
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
        </Col>
      </Row>
      <Editor
        options={{
          unicodeHighlight: {
            ambiguousCharacters: false,
          },
        }}
        onMount={editorMount}
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
      <ModalInsertChapterSimple
        showInsertChapter={showInsertChapter}
        handleCloseInsertChapter={handleCloseInsertChapter}
        handleInsertChapter={handleInsertChapter}
      />
    </Container>
  );
}
