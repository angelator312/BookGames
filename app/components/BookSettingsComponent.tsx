import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormComponent from "./formComp";
import MenuForHome from "./home.menu";
import type { SettingsInterface, User } from "~/utils/User";
import { getDefaultSettings } from "~/utils/User";

export const loader = async () => {
  return;
};
export const action = async () => {
  return;
};

export default function BookSettingsComponent({
  bookResume,
  name,
  tags = [],
  user,
}: {
  name: string;
  tags?: string[];
  bookResume: string;
  user: User;
}) {
  const settings: SettingsInterface = user.settings ?? getDefaultSettings();
  const [text, setText] = useState(bookResume);
  // const [tagsList, setTagsList] = useState(tags);
  function handleEditorChange(value: any, event: any) {
    setText(value);
  }
  return (
    <div>
      <MenuForHome settings={settings} user={user} />
      <Row>
        <Col>
          <p className="mt-5">Кратко описание на книгата</p>
          <Editor
            options={{
              unicodeHighlight: {
                ambiguousCharacters: false,
              },
            }}
            height="22vh"
            defaultLanguage="bg"
            onChange={handleEditorChange}
            // name="text"
            // placeholder="Здравей,Човече"
            defaultValue={text}
          />
          <FormComponent
            to="/zapaziBookResume"
            textForSubmit="Запази"
            namesHidden={["text", "book"]}
            textsHidden={[text, name]}
          />
        </Col>
        <Form method="post">
          <Form.Group>
            <Form.Label>Тагове:</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              defaultValue={tags.join(",")}
              placeholder="таг,друг таг"
            />
            <Button variant="success" type="submit">
              Запази
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
}
