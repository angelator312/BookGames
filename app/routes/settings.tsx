import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import MenuForHome from "~/components/home.menu";
import { requireUserId } from "~/utils/session.server";
import type { SettingsInterface, User } from "~/utils/userStore";
import getUserStore from "~/utils/userStore";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const a = await requireUserId(request, false);
  // console.log(a);
  // console.log(await knigi(a));

  if (typeof a === "string") {
    const uStore = await getUserStore();
    const user = await uStore.getUser(a);
    if (user) {
      return [user, user.settings ?? uStore.getDefaultSettings()];
    }
  }
  return redirect("/");
};
type loaderType = [User, SettingsInterface];
export default function Settings() {
  const [user, settings] = useLoaderData<loaderType>();
  const [fontSize, setFontSize] = useState(settings.fontSize);

  return (
    <Container>
      <MenuForHome
        //@ts-ignore
        user={user}
        settings={settings}
      />
      <Tabs>
        <Tab title="Тема" eventKey={"Тема"}>
          <Row>
            <Col>
              <Form action="/zapaziSettings">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label
                    column
                    sm={10}
                    style={{
                      fontSize: Math.max(fontSize, 10) / 10 + "rem",
                    }}
                  >
                    Големина на шрифта
                  </Form.Label>
                  <Form.Control
                    min={10}
                    max={50}
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value ?? 2))}
                    name="fontSize"
                  />
                  <Form.Control type="hidden" value="/settings" name="toUrl" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}
