import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import getTextStore from "~/utils/textStore";
import { requireUserId } from "~/utils/session.server";
import DropDown1 from "~/components/dropdown";
import { useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import EditText from "~/components/editText";
import Text from "~/components/text";
export async function action({ params, request }: ActionFunctionArgs) {
  // const form = await request.formData();
  // let glava = form.get("to");
  // if (!glava) glava = "1";
  // // let b = await getGorB("book");
  // // console.log(b);

  // const userStore = await getUserStore();
  // const uId = await getUserId(request);
  // console.log("Glava:",glava);

  // @ts-ignore Заради uId:string|null
  //  console.log(
  //   await userStore.editUserSGlava(
  //     uId ?? "",
  //     `Book-${params.book}`,
  //     glava.toString()
  //   )
  // );
  // if (!glava) glava = "1";
  // const b = await textStore.getBook(book);
  // let text = await textStore.getText(`${b}-${glava}`);
  // if (!text) {
  //   text = { text: "" };
  // }
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.glava;
  const book = params.book;
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${book}/1`);
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  const b = await tStore.getBook(book ?? "");
  // console.log(glava);
  if (typeof a === "string") {
    if (b?.avtor == a) {
      let t = await tStore.getText(`${book}-${glava}`);
      return [book, glava, t];
    }
    return redirect(`/book/${book}`);
  }
  return redirect("/login");
}
export default function Book1() {
  function update() {
    textLines = text.split("\n\n");
    text2Lines = text2.split(reg);
    furst2Lines = [textLines[0], textLines[1]];
    textLines = textLines.slice(2);
  }
  const [bUrl, gl, t] = useLoaderData<typeof loader>();

  const [text, setText] = useState(typeof t === "string" ? "" : t?.text ?? "");
  const [text2, setText2] = useState(
    //@ts-ignore
    typeof t === "string" ? "" : t?.text2 ?? ""
  );

  const reg = /\(Глава\s+(\d+)\)/g;
  let textLines = text.split("\n\n");
  let text2Lines = text2.split(reg);
  let furst2Lines = [textLines[0], textLines[1]];
  textLines = textLines.slice(2);
  return (
    <div className="m-l-3">
      <Row>
        <Col sm="1"></Col>
        <Col sm="6">
          <DropDown1
            url={`/myBook/${bUrl}`}
            doN={15}
            // @ts-ignore
            activeDrop={parseInt(gl ?? 0)}
          />
        </Col>
      </Row>
      <br />
      <Tabs
        defaultActiveKey="edit"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="edit" title="Edit text">
          <Col sm="6">
            <EditText
              param={{
                text,
                text2,
                glava: gl?.toString() ?? "1",
                bUrl: `${bUrl}`,
                setText,
                setText2,
                priIzvikvane: update,
              }}
            />
          </Col>
          <Row>
            <Col sm="6">
              <Link to="/">
                <Button variant="primary">Start</Button>
              </Link>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="preview" title="Preview">
          <Text
            furst2Lines={furst2Lines}
            glava={gl?.toString() ?? "1"}
            url={`/myBook/${bUrl}`}
            textLines={textLines}
            text2Lines={text2Lines}
            flag1={false}
          />
          <Row>
            <Col sm="6">
              <Link to="/">
                <Button variant="primary">Start</Button>
              </Link>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="editAndPreview" title="Edit and preview">
          <Container>
            <Row>
              <Col sm="6">
                <EditText
                  param={{
                    text,
                    text2,
                    glava: gl?.toString() ?? "1",
                    bUrl: `${bUrl}`,
                    setText,
                    setText2,
                    priIzvikvane: update,
                  }}
                />
              </Col>
              <Col>
                <Text
                  furst2Lines={furst2Lines}
                  glava={gl?.toString() ?? "1"}
                  url={`/myBook/${bUrl}`}
                  textLines={textLines}
                  text2Lines={text2Lines}
                  flag1={false}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="4"></Col>
              <Col sm="6">
                <Link to="/">
                  <Button variant="primary">Start</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
      <Container></Container>
    </div>
  );
}
