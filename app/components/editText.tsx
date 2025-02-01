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
import { ModalInsertChapterSimpleWithScoreChange } from "./ModalInsertChapterSimpleWithScoreChange";
import GetImagesModal from "./getImages";
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
  const [showInsertImage, setShowInsertImage] = useState(false);
  const [showInsertChapter, setShowInsertChapter] = useState(false);
  const [showInsertChapter2, setShowInsertChapter2] = useState(false);
  function handleInsertChapter(insertChapter: number, text: string) {
    insertText(`=>(Глава ${insertChapter})[${text ?? "AAAA"}]`);
    return setShowInsertChapter(false);
  }
  function handleInsertImage(insertID: string) {
    insertText(`=>[image:${insertID}]`);
    return setShowInsertImage(false);
  }
  function handleInsertChapter2(
    insertChapter: number,
    scoreChange: number,
    text: string
  ) {
    insertText(
      `=>(Глава ${insertChapter})(резултат ${scoreChange})[${text ?? "AAAA"}]`
    );
    return setShowInsertChapter2(false);
  }
  const handleCloseInsertChapter = () => setShowInsertChapter(false);
  const handleCloseInsertImage = () => setShowInsertImage(false);
  const handleCloseInsertChapter2 = () => setShowInsertChapter2(false);
  const handleShowInsertChapter = () => setShowInsertChapter(true);
  const handleShowInsertImage = () => setShowInsertImage(true);
  const handleShowInsertChapter2 = () => setShowInsertChapter2(true);
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
                На избор за глава
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={handleShowInsertChapter2}>
                На избор за глава със резултат
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={handleShowInsertImage}>
                На Картинка
              </Dropdown.Item>
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
        height="20vh"
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
        изборите са след --- <br />
        Всичко е описано в Помощ и нещата за вмъкване се вмъкват чрез бутона
        <br />
        Ако искате да ви е по-лесно редактирайте в уголемен прозорец
        <br />
        Поддържаме{" "}
        <a href="s" onClick={()=>window.open("https://www.markdownguide.org/basic-syntax/")}>Markdown</a>
        <br />
      </p>

      <br />
      <ModalInsertChapterSimple
        showInsertChapter={showInsertChapter}
        handleCloseInsertChapter={handleCloseInsertChapter}
        handleInsertChapter={handleInsertChapter}
      />
      <ModalInsertChapterSimpleWithScoreChange
        showInsertChapter={showInsertChapter2}
        handleCloseInsertChapter={handleCloseInsertChapter2}
        handleInsertChapter={handleInsertChapter2}
      />
      <GetImagesModal
        handleClose={handleCloseInsertImage}
        show={showInsertImage}
        handleInsertImage={handleInsertImage}
      />
    </Container>
  );
}
