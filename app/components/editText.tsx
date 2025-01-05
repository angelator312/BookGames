import { Button, Container } from "react-bootstrap";
import { Editor } from "@monaco-editor/react";

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
    setText(value.replace(/\r/gm, "") ?? "");
    if (priIzvikvane) {
      priIzvikvane();
    }
  }
  function handleEditorChange2(value: any, event: any) {
    setText2(value.replace(/\r/gm, "") ?? " ");
    if (priIzvikvane) {
      priIzvikvane();
    }
  }
  return (
    <Container fluid>
      <Editor
        height="15vh"
        defaultLanguage="text"
        onChange={handleEditorChange}
        // name="text"
        // placeholder="Здравей,Човече"
        defaultValue={text ?? "Здравей,Човече"}
      />
      <p>
        За нов абзац два празни реда
        <br />
        Посочете към коя глава сочи избора на читателя. Пр. "Към Светлината
        (Глава 2)" <strong>↓↓↓</strong>
      </p>
      <Editor
        height="15vh"
        defaultLanguage="text"
        onChange={handleEditorChange2}
        // name="text"
        // placeholder="Здравей,Човече"
        defaultValue={text2 ?? "Към тъмната гора (Глава 2)"}
      />
      <p>
        За линк към друга глава : (Глава число) Пр. "Бий се (Глава 3)" <br />
        Кръглите скоби () са задължителен атрибут при посочване на конкретна
        Глава
        <br />
          <Button variant="secondary" onClick={() => window.open("/helpLanguage")}>
            Допълнителни обяснения за псевдо езика
          </Button>
      </p>

      <br />
      
    </Container>
  );
}
