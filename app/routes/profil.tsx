import { Editor } from "@monaco-editor/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import MenuForHome from "~/components/home.menu";
import { requireUserId } from "~/utils/session.server";
import type { SettingsInterface, User, UserData } from "~/utils/User";
import getUserStore from "~/utils/userStore";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const a = await requireUserId(request, false);
  // console.log(a);
  // console.log(await knigi(a));

  if (typeof a === "string") {
    const uStore = await getUserStore();
    const user = await uStore.getUser(a);
    if (user) {
      return [
        user,
        user.settings ?? uStore.getDefaultSettings(),
        user.data ?? uStore.getDefaultUserData(),
      ];
    }
  }
  return redirect("/");
};
type loaderType = [User, SettingsInterface, UserData];
export default function Settings() {
  const [user, settings, data] = useLoaderData<loaderType>();
  const [text, setText] = useState(data.forMe);
  function handleEditorChange(value: any, event: any) {
    setText(value);
  }
  return (
    <Container>
      <MenuForHome
        //@ts-ignore
        user={user}
        settings={settings}
      />
      <Tabs>
        <Tab title="За мен" eventKey={"За мен"}>
          <Row>
            <Col>
              <Form action="/zapaziForMe">
                <Row>
                  <Col>
                    <Form.Label column sm={10}>
                      Резюме
                    </Form.Label>
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
                      height="20vh"
                      defaultLanguage="bg"
                      onChange={handleEditorChange}
                      // name="text"
                      // placeholder="Здравей,Човече"
                      defaultValue={text == "" ? "Здравей,Човече" : text}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control type="submit" value={"Запази"} />
                    <Form.Control type="hidden" value={text} name="forMe" />
                    <Form.Control type="hidden" value="/Profil" name="toUrl" />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Tab>
        {/* <Tab title="Планове" eventKey={"Paying"}>
          <Row>
            <Col>
            
            </Col>
          </Row>
        </Tab> */}
      </Tabs>
    </Container>
  );
}
