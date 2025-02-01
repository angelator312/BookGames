import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import FormComponent from "./formComp";
import MenuForHome from "./home.menu";
import { getDefaultSettings, SettingsInterface, User } from "~/utils/User";

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
  user:User;
}) {
  const settings:SettingsInterface=user.settings??getDefaultSettings();
  const [text, setText] = useState(bookResume);
  const [tagsList, setTagsList] = useState(tags);
  function handleEditorChange(value: any, event: any) {
    setText(value);
  }
  return (
    <div>
      <MenuForHome settings={settings} user={user} />
      <Row>
        <Col>
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
      </Row>
    </div>
  );
}
