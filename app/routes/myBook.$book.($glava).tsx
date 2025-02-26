import type {
  BookInterface as BookType,
  TextInterface as Text2,
} from "~/utils/textStore";
import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import getTextStore from "~/utils/textStore";
import { requireUserId } from "~/utils/session.server";
import DropDown1 from "~/components/dropdown";
import { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import EditText from "~/components/editText";
import NavYesOrNo from "~/components/navbarYes";
import Book from "~/components/book";
import getUserStore from "~/utils/userStore";
import type { User } from "~/utils/User";
import BookSettingsComponent from "~/components/BookSettingsComponent";
import type { VariableCollection } from "~/utils/VariableThings";
import { getDefaultVariables } from "~/utils/VariableThings";
export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  if (userId) {
    let addP = false;
    const formData = await request.formData();
    if (formData) {
      const tags = formData.get("tags")?.toString();
      //for tags
      if (typeof tags === "string") {
        const tagList = tags.split(",").map((tag) => tag.trim());
        const bId = params.book;
        if (bId) {
          // console.log("tags:", tagList);
          const tStore = await getTextStore();
          await tStore.setBook(bId, { tags: tagList });
        }
      }
      // for Variables
      const isHavingVars = formData.get("isHavingVars")?.toString();
      if (isHavingVars == "yes") {
        let values: VariableCollection = {};
        formData.forEach((value, key) => {
          if (key.startsWith("var/")) {
            key = key.substring(4);
            values[key] = {
              name: key,
              value: parseInt(value.toString(), 10),
            };
          }
        });
        const bId = params.book;
        if (bId) {
          // console.log("values:", values);
          const vStore = await getTextStore();
          await vStore.saveDefaultVariables(bId, values);
          addP = true;
        }
      }
    }
    return redirect(new URL(request.url).pathname + addP ? "" : "?default=2");
  }
  return redirect("/login");
}

type loaderData = [
  BookType,
  string,
  Text2,
  string,
  string[][],
  User,
  VariableCollection,
  string,
  string[]
];

export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.glava;
  const bId = params.book;
  if (!bId) return;
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${bId}/1`);
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  let book = await tStore.getBook(bId ?? "");
  if (!book) return redirect(`/`);

  if (parseInt(glava) > parseInt(book.doGl ?? "1")) {
    if (book.id) {
      // console.log("gl:", parseInt(glava), parseInt(book.doGl ?? "1"));
      book.doGl = glava;
      await tStore.setBook(bId, { doGl: glava });
    }
  }
  // console.log(glava);
  if (typeof a === "string") {
    if (book.avtor == a) {
      const uStore = await getUserStore();
      const comments = await tStore.getComments(bId ?? "", glava);
      let t = await tStore.getText(`${bId}-${glava}`);
      return [
        await tStore.getBook(bId),
        glava,
        t ?? tStore.prototypeOfText(),
        book.doGl,
        comments,
        await uStore.getUser(a),
        book.defaultVariables ?? getDefaultVariables(),
        book.text2,
        book.tags ?? [],
      ];
    }
    return redirect(`/book/${bId}`);
  }
  return redirect("/login?redirectTo=" + request.url);
}
export default function Book1() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [book, gl, t, doN, comments, user, vars, bookResume, tags] =
    useLoaderData<loaderData>();
  const bUrl = book.text;
  let comm = comments;
  function update() {
  }
  const [text, setText] = useState(
    //@ts-ignore
    typeof t === "string" ? "проба" : t?.text ?? "проба"
  );
  const [text2, setText2] = useState(
    //@ts-ignore
    typeof t === "string" ? "проба" : t?.text2 ?? "проба"
  );
  useEffect(() => {
    //@ts-ignore
    setText(typeof t === "string" ? "проба" : t?.text ?? "проба");
    //@ts-ignore
    setText2(typeof t === "string" ? "проба" : t?.text2 ?? "проба");
  }, [gl, t]);
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

  let textLines = text.replace("\r", "\n").split("\n\n");
  // let furst2Lines = [textLines[0], textLines[1]];
  textLines = textLines.slice(2);
  // console.log("t",t);
  // console.log(text, gl, text2);

  return (
    <div className="m-l-3">
      <NavYesOrNo text={feedMsg ?? ""} />
      <NavYesOrNo text={errMsg ?? ""} yes={false} />
      <br />
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={
          searchParams.get("default") == "2" ? "settings" : "editAndPreview"
        }
      >
        <Row>
          <Nav>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="editAndPreview">Редактирай</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="settings">Настройки</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <DropDown1
                url={`/myBook/${bUrl}`}
                // @ts-ignore
                doN={parseInt(doN ?? "15")}
                // @ts-ignore
                activeDrop={parseInt(gl)}
              />
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link
                  eventKey="editAndPreview"
                  onClick={() => {
                    window.open(`/myBook/see/${bUrl}/${gl}`);
                  }}
                >
                  Преглед
                </Nav.Link>
              </Nav.Item>
            </Col>
          </Nav>
        </Row>
        <Row>
          <Tab.Content
            id="uncontrolled-tab-example"
            className="mb-3"
            key={"space"}
          >
            {/* <Button eventKey="preview" title="Преглед" onClick={()=>{window.open(`/myBook/see/${bUrl}/${gl}`);}}> */}

            {/* </Button> */}
            <Tab.Pane eventKey="editAndPreview" title="Редактирай">
              <Container fluid className="h-100">
                <Row className="mt-3">
                  <Col>
                    <EditText
                      text={text}
                      text2={text2}
                      glava={gl ?? "1"}
                      bUrl={`${bUrl}`}
                      setText={setText}
                      setText2={setText2}
                      priIzvikvane={update}
                      key={gl}
                    />
                  </Col>
                  <Col style={{ height: "80vh", overflow: "scroll" }}>
                    <Book
                      url={`/myBook/${bUrl}`}
                      title={book.id ?? "Книга " + bUrl}
                      almP={`/myBook/${bUrl}/`}
                      flag={3}
                      params={{
                        text,
                        glava: gl,
                        text2,
                        //@ts-ignore
                        user: user ?? "",
                        book: { text: bUrl },
                        //@ts-ignore
                        variables: vars,
                      }}
                      kr={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="settings" title="Настройки">
              <BookSettingsComponent
                bName={book.id ?? ""}
                //@ts-ignore
                user={
                  user
                  //   {
                  //   ...user,
                  //   // _id:new ObjectId(user._id)
                  // }
                }
                tags={tags}
                bookResume={bookResume}
                name={bUrl}
                vars={vars}
              />
            </Tab.Pane>
          </Tab.Content>
          <Container>
            {/* @ts-ignore */}
            {comm.map((e, i) => (
              <Row key={i}>
                <Col sm="7">
                  <NavYesOrNo
                    text={e[0].length > 0 ? `${e[0]}\n от ${e[1]}` : ""}
                    f={(a: any) => {
                      navigate(
                        `/myBook/${bUrl}/${gl}/deleteComment/${i}?p="sx"`
                      );
                    }}
                  />
                </Col>
              </Row>
            ))}
          </Container>
        </Row>
      </Tab.Container>
    </div>
  );
}
