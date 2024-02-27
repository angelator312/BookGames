import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import getTextStore from "~/utils/textStore";
import { requireUserId } from "~/utils/session.server";
import DropDown1 from "~/components/dropdown";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import EditText from "~/components/editText";
import Text from "~/components/text";
import NavYesOrNo from "~/components/navbarYes";
export async function action({ request }: ActionFunctionArgs) {
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.glava;
  const book = params.book;
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${book}/1`);
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  let b = await tStore.getBook(book ?? "");
  if (parseInt(glava) > parseInt(b?.doGl ?? "1")) {
    await tStore.addBook(
      b?.id?.substring(5, b.id?.length - 3) ?? "",
      `${book}`,
      b?.avtor ?? "",
      true,
      glava
    );
    if (b) b.doGl = glava;
  }
  // console.log(glava);
  if (typeof a === "string") {
    if (b?.avtor == a) {
      const comments = await tStore.getComments(book ?? "", glava);
      let t = await tStore.getText(`${book}-${glava}`);
      return [book, glava, t ?? tStore.prototypeOfText(), b.doGl, comments];
    }
    return redirect(`/book/${book}`);
  }
  return redirect("/login");
}
export default function Book1() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bUrl, gl, t, doN, comments] = useLoaderData<typeof loader>();
  let comm = comments;
  function update() {
    // setText(text.replace("\r", "\n"));
    // setText2(text2.replace("\r", "\n"));
    textLines = text.split("\n\n");
    text2Lines = text2.split(reg);
    furst2Lines = [textLines[0], textLines[1]];
    textLines = textLines.slice(2);
  }
  //@ts-ignore
  const [text, setText] = useState(typeof t === "string" ? "" : t?.text ?? "");
  const [text2, setText2] = useState(
    //@ts-ignore
    typeof t === "string" ? "" : t?.text2 ?? ""
  );
  useEffect(() => {
    setText(text.replace("\r", "\n"));
    setText2(text2.replace("\r", "\n"));
  }, [text, text2]);

  const feedCode = searchParams.get("feedCode");
  const errCode = searchParams.get("errCode");
  let [feedMsg] = useState(searchParams.get("feed"));
  let [errMsg] = useState(searchParams.get("err"));

  if (!feedMsg) {
    switch (feedCode) {
      case "1":
        feedMsg = "Запазването приключи!";
        break;
      case "2":
        feedMsg = "Публикуването завърши успешно!";
        break;

      default:
        break;
    }
  }

  if (!errMsg) {
    switch (errCode) {
      case "1":
        errMsg = "Моля въведете текст!";
        break;

      default:
        break;
    }
  }

  const reg = /\(Глава\s+(\d+)\)/g;
  let textLines = text.replace("\r", "\n").split("\n\n");
  let text2Lines = text2.replace("\r", "\n").split(reg);
  let furst2Lines = [textLines[0], textLines[1]];
  textLines = textLines.slice(2);
  // console.log( );
  return (
    <div className="m-l-3">
      <NavYesOrNo text={feedMsg ?? ""} />
      <NavYesOrNo text={errMsg ?? ""} yes={false} />
      <Row>
        <Col sm="1"></Col>
        <Col sm="6">
          <DropDown1
            url={`/myBook/${bUrl}`}
            // @ts-ignore
            doN={parseInt(doN ?? "15")}
            // @ts-ignore
            activeDrop={parseInt(gl ?? 0)}
          />
        </Col>
      </Row>
      <br />
      <Tabs
        defaultActiveKey="preview"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="edit" title="Промени текста">
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
                <Button variant="secondary">Към главната страница</Button>
              </Link>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="preview" title="Изглед">
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
                <Button variant="secondary">Към главната страница</Button>
              </Link>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="editAndPreview" title="Промени текста и изглед">
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
                  <Button variant="secondary">Към главната страница</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
      <Container>
        {/* @ts-ignore */}
        {comm.map((e, i) => (
          <Row key={i}>
            <NavYesOrNo
              text={e}
              f={(a: any) => {
                navigate(`/myBook/${bUrl}/${gl}/deleteComment/${i}?p="sx"`);
              }}
            />
          </Row>
        ))}
      </Container>
    </div>
  );
}
