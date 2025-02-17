import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Spinner,
} from "react-bootstrap";
import { Editor, type OnMount } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import type { editor } from "monaco-editor";
import { ModalInsertChapterSimple } from "./ModalInsertChapterSimple";
import { ModalInsertChapterSimpleWithScoreChange } from "./ModalInsertChapterSimpleWithScoreChange";
import GetImagesModal from "./getImages";
import { pomoshti } from "~/helps/pomoshti";
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
  const setEntireEditor = (text: string) => {
    if (monacoInstance) {
      const id = { major: 1, minor: 1 };
      const op = {
        identifier: id,
        range: {
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: 100000,
          endColumn: 10000000,
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
  function handleInsertImage(insertID: string, name?: string) {
    if (!name) name = "";
    insertText(`![${name}](/getImage/${insertID} "${name}")`);
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
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault(); // Prevent the Save dialog from opening
        console.log("CTRL + S");
        zapazi();
      }
    });
  }, []);
  async function zapazi() {
    setSaving(true);
    const formData = new FormData();
    formData.append("text1", text);
    formData.append("text2", text2);

    await fetch(`/myBook/${bUrl}/${glava}/save`, {
      method: "POST",
      body: formData,
    });
    setSaving(false);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <ButtonGroup>
            {/* <Button onClick={() => setText("")}>Изчисти</Button> */}
            {/* <FormComponent
              textsHidden={[
                text.replace(/\r/gm, "") ?? "a",
                text2.replace(/\r/gm, "") ?? "a",
                ]}
              to={`/myBook/${bUrl}/${glava}/save`}
              textForSubmit="Запази промените"
              submitVariant="danger"
            /> */}
            <Button variant="success" onClick={() => zapazi()}>
              {saving ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : null}
              Запази{" "}
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
            <DropdownButton
              as={ButtonGroup}
              variant="secondary"
              title="Помощ"
              id="bg-nested-dropdown"
            >
              <Dropdown.Item
                eventKey="1"
                onClick={() => setEntireEditor(pomoshti["Примерна Глава"])}
              >
                Примерна глава(всичко което сте написали в главата ще бъде
                махнато)
              </Dropdown.Item>

              <Dropdown.Item eventKey="2" onClick={()=>window.open("/helpLanguage")}>
                Документация на езика
              </Dropdown.Item>
              {/* <Dropdown.Item eventKey="2" onClick={handleShowInsertImage}>
                На Картинка
              </Dropdown.Item> */}
            </DropdownButton>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
        </Col>
      </Row>
      <Row>
        <Col>
          <Editor
            options={{
              unicodeHighlight: {
                ambiguousCharacters: false,
              },
            }}
            onMount={editorMount}
            height="74vh"
            defaultLanguage="bg"
            onChange={handleEditorChange}
            // name="text"
            // placeholder="Здравей,Човече"
            defaultValue={
              (text == "" ? "Здравей,Човече" : text) + "\n---\n" + text2
            }
          />
        </Col>
      </Row>

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
