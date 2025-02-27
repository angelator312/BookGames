import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import FormComponent from "./formComp";
import MenuForHome from "./home.menu";
import type { SettingsInterface, User } from "~/utils/User";
import { getDefaultSettings } from "~/utils/User";
import type {
  VariableCollection,
  VariableInterface,
} from "~/utils/VariableThings";
import BookIntro from "./bookIntro";

export const loader = async () => {
  return;
};
export const action = async () => {
  return;
};

export default function MyBookSettingsComponent({
  bookResume,
  name: bId,
  tags = [],
  user,
  vars: userVariables,
  bName: bookName,
}: {
  name: string;
  tags?: string[];
  bookResume: string;
  user: User;
  vars: VariableCollection;
  bName: string;
}) {
  const settings: SettingsInterface = user.settings ?? getDefaultSettings();
  const [text, setText] = useState(bookResume);
  const [show, setShow] = useState(false);
  // const [tagsList, setTagsList] = useState(tags);
  function handleEditorChange(value: any, event: any) {
    setText(value);
  }
  return (
    <div>
      <MenuForHome settings={settings} user={user} />
      <Row>
        <Col>
          <p className="mt-3">Кратко описание на книгата</p>
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
          <Button className="mt-3" onClick={() => setShow(!show)}>
            {show ? "Скрий" : "Покажи"}
          </Button>
          <BookIntro
            show={show}
            smallDescription={text}
            urlForImage={"/img/question_mark.png"}
            avtor={user.user}
            avtorDesc={user.data.forMe}
            bName={bookName}
          />
          <FormComponent
            to="/zapaziBookResume"
            textForSubmit="Запази"
            namesHidden={["text", "book"]}
            textsHidden={[text, bId]}
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
            <Button variant="success" type="submit" className="mt-1">
              Запази
            </Button>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Col>
          <Card className="mt-2">
            <Card.Body>
              <Card.Title>
                <h4>Първоначалните стойности на променливите</h4>
              </Card.Title>
              <Form method="post">
                <Form.Control type="hidden" name="isHavingVars" value={"yes"} />
                {Object.values(userVariables).map((varItem: VariableInterface) => {
                  return (
                    <Col key={varItem.name}>
                      <Form.Group>
                        <Form.Label>{varItem.name}</Form.Label>
                        <Form.Control
                          type="number"
                          name={"var/" + varItem.name}
                          defaultValue={varItem.value}
                          placeholder={varItem.name}
                        />
                      </Form.Group>
                    </Col>
                  );
                })}
                <Button type="submit" className="mt-1">
                  Запази
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
